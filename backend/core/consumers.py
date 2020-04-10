from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

HOME_GROUP_NAME = "PointyHome"


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
            self.send(build_pointy_state())
        elif content["type"] == "room_created":
            # do what's needed to create the room
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
        "rooms": [
            {
                "name": "Scarlet Crown Backlog Grooming",
                "session_id": "sc_backlog_grooming",
            },
            {
                "name": "Disco Backlog Grooming",
                "session_id": "disco_backlog_grooming",

            },
        ],
        "values_templates": [
            {
                "id": 1,
                "name": "Sprint Point Values",
            },
            {
                "id": 2,
                "name": "Fist of Five",
            },
        ]
    }
