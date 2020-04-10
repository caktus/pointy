import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from django.utils import timezone


HOME_GROUP_NAME = "PointyHome"

from .models import VALUES_TEMPLATES, PointyRoom, RoomUser, RoomTicket


class PointyHome(JsonWebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            HOME_GROUP_NAME,
            self.channel_name
        )
        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            HOME_GROUP_NAME,
            self.channel_name
        )

    def pointy_state(self, event):
        self.send(text_data=json.dumps(event))

    def receive_json(self, content, **kwargs):
        if content["type"] == "request_pointy_state":
            self.send(json.dumps(build_pointy_state()))
        elif content["type"] == "room_created":
            create_room(content["message"])
            async_to_sync(self.channel_layer.group_send)(
                HOME_GROUP_NAME,
                build_pointy_state()
            )

class PointySession(JsonWebsocketConsumer):
    def connect(self):
        self.session_id = self.scope["url_route"]["kwargs"]["session_id"]
        self.group_name = f"pointy_{self.session_id}"
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def room_update(self, event):
        self.send(text_data=json.dumps(event))

    def receive_json(self, content, **kwargs):
        room = PointyRoom.objects.filter(session_id=self.session_id).first()
        if not room:
            return

        publish_room = False
        single_send_room = False
        room_fields = []
        event_type = content.get("type")
        message = content.get("message", {})

        if event_type == "join_room":
            username = message.get("user")
            _ruser, created = RoomUser.objects.get_or_create(room=room, username=username)
            if created:
                publish_room = True
            else:
                # user re-joining needs the room data, but others don't
                single_send_room = True
        elif event_type == "ticket_created" and room.phase == "ticket_creation":
            name = message.get("ticket_name")
            RoomTicket.objects.create(room=room, name=name, last_update_dt=timezone.now())
            room.phase = "voting"
            room_fields.append("phase")
            publish_room = True
        elif event_type == "vote" and room.phase != "ticket_creation":
            username = message.get("user")
            vote = message.get("point")
            ruser = room.users.filter(username=username)
            if ruser and vote and str(vote) != ruser.vote:
                ruser.vote = vote
                ruser.save()
                publish_room = True
                if room.phase == "voting" and not room.users.filter(vote="").exists():
                    room.phase = "reconciliation"
                    room_fields.append("phase")
                elif room.phase == "reconciliation":
                    vote_values = room.users.values_list("vote", flat=True).distinct()
                    if vote_values.count() == 1:
                        room.phase = "ticket_creation"
                        room_fields.append("phase")
                        ticket = room.tickets.order_by('-last_update_dt').first()
                        ticket.final_vote = vote_values[0]
                        ticket.last_update_dt = timezone.now()
                        ticket.save()
                        room.users.update(vote="")

        if room_fields or publish_room or single_send_room:
            room.last_access_dt = timezone.now()
            room_fields.append("last_access_dt")
            room.save(update_fields=room_fields)

        if publish_room:
            async_to_sync(self.channel_layer.group_send)(
                self.group_name,
                build_room_update(room)
            )
        elif single_send_room:
            self.send(json.dumps(build_room_update(room)))


def build_room_update(room):
    return {
        "type": "room_update",
        "message": room.update_message(),
    }


def build_pointy_state():
    return {
        "type": "pointy_state",
        "message": {
            "rooms": [
                {"name": t[0], "session_id": t[1]} for t in PointyRoom.objects.values_list("name", "session_id")
            ],
            "values_templates":
                [{"id": key, "name": value["name"]} for key, value in VALUES_TEMPLATES.items()]
        }
    }


def create_room(message):
    room, _created = PointyRoom.objects.get_or_create(
        session_id=message["session_id"], defaults={
            "name": message["room_name"],
            "admin_name": message["admin_name"],
            "values_template_id": message["values_template_id"],
            "phase": "ticket_creation",
            "last_access_dt": timezone.now(),
        })
    PointyRoom.objects.filter(pk=room.pk).update(last_access_dt=timezone.now())
    return room
