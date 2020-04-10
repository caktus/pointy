import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from django.utils import timezone


HOME_GROUP_NAME = "PointyHome"

from .models import VALUES_TEMPLATES, PointyRoom


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

    def receive_json(self, content, **kwargs):
        if content["type"] == "request_pointy_state":
            self.send(json.dumps(build_pointy_state()))
        elif content["type"] == "room_created":
            self.create_room(content["message"])
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

    def receive_json(self, content, **kwargs):
        # Currently just echoes back what we get
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            content
        )



def build_pointy_state():
    return {
        "type": "pointy_state",
        "message": {
            "rooms": [
                {"name": t[0], "session_id": t[1]} for t in PointyRoom.objects.values_list("name", "session_id")
            ],
            "values_templates":
                [{"id": d["id"], "name": d["name"]} for d in VALUES_TEMPLATES]
        }
    }


def create_room(message):
    room, _created = PointyRoom.objects.get_or_create(
        session_id=message["session_id"], defaults={
            "name": message["room_name"],
            "admin_name": message["admin_name"],
            "values_template_id": message["values_template_id"],
            "phase": "ticket_creation",
        })
    PointyRoom.objects.filter(pk=room.pk).update(last_access_dt=timezone.now())
    return room
