import logging
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

logger = logging.getLogger(__name__)
HOME_GROUP_NAME = "PointyHome"

class PointyHome(JsonWebsocketConsumer):
    def connect(self):
        logger.info("Socket connected")
        async_to_sync(self.channel_layer.group_add)(
            HOME_GROUP_NAME,
            self.channel_name
        )
        self.accept()
        logger.info("Socket accepted")

    def disconnect(self, code):
        logger.info("Socket disconnected")
        async_to_sync(self.channel_layer.group_discard)(
            HOME_GROUP_NAME,
            self.channel_name
        )

    def receive_json(self, content, **kwargs):
        # Currently just echoes back what we get
        logger.info(f"Socket received: {content}")
        async_to_sync(self.channel_layer.group_send)(
            HOME_GROUP_NAME,
            content
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
