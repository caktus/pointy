from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/pointy/$", consumers.PointyHome),
    re_path(r"ws/pointy/(?P<session_id>\w+)/$", consumers.PointySession),
]
