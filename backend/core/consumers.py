import json
import logging
from channels.generic.websocket import WebsocketConsumer

logger = logging.getLogger(__name__)

class PointyHome(WebsocketConsumer):
    def connect(self):
        logger.info("Socket connected")
        self.accept()
        logger.info("Socket accepted")

    def disconnect(self, close_code):
        logger.info("Socket disconnected")

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        logger.info(f"Socket received: {text_data_json}")
        message = text_data_json['message']
        logger.info(f"Socket send: {message}")
        self.send(text_data=json.dumps({
            'message': message
        }))
