from django.db import models


VALUES_TEMPLATES = [
    {"id": 1, "name": "Sprint Point Values", "values": [1, 2, 3, 5, 8, 13]},
    {"id": 2, "name": "Fist of Five", "values": [1, 2, 3, 4, 5]},
]


class PointyRoom(models.Model):
    name = models.CharField(max_length=512)
    session_id = models.CharField(max_length=512, unique=True)
    admin_name = models.CharField(max_length=512)
    values_template_id = models.IntegerField()
    phase = models.CharField(max_length=512)
    last_access_dt = models.DateTimeField()

    def __str__(self):
        return f"{self.name} ({self.session_id})"


class RoomUser(models.Model):
    room = models.ForeignKey(PointyRoom, related_name="users", on_delete=models.CASCADE)
    username = models.CharField(max_length=512)
    vote = models.CharField(max_length=512, blank=True, default="")

    class Meta:
        unique_together = [("room", "username")]

    def __str__(self):
        return f"{self.username} in {self.room}"


class RoomTicket(models.Model):
    room = models.ForeignKey(PointyRoom, related_name="tickets", on_delete=models.CASCADE)
    name = models.CharField(max_length=512)
    final_vote = models.CharField(max_length=512, blank=True, default="")
    last_update_dt = models.DateTimeField()

    class Meta:
        unique_together = [("room", "name")]
        ordering = ('-last_update_dt',)

    def __str__(self):
        if self.final_vote:
            return f"{self.name} final vote {self.final_vote}"
        else:
            return f"{self.name} not yet finalized"
