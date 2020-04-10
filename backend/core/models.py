from django.db import models


VALUES_TEMPLATES = {
    1: {"name": "Sprint Point Values", "values": [1, 2, 3, 5, 8, 13]},
    2: {"name": "Fist of Five", "values": [1, 2, 3, 4, 5]},
}


class PointyRoom(models.Model):
    name = models.CharField(max_length=512)
    session_id = models.CharField(max_length=512, unique=True)
    admin_name = models.CharField(max_length=512)
    values_template_id = models.IntegerField()
    phase = models.CharField(max_length=512)
    last_access_dt = models.DateTimeField()

    def __str__(self):
        return f"{self.name} ({self.session_id})"

    def update_message(self):
        ticket_qs = self.tickets.order_by("-last_update_dt")
        ticket = ticket_qs.first()
        prev_tickets = ticket_qs[1:6]
        return {
            "name": self.name,
            "session_id": self.session_id,
            "admin": self.admin_name,
            "phase": self.phase,
            "users": list(self.users.values_list("username", flat=True).order_by("username")),
            "ticket": {"id": ticket.id, "name": ticket.name} if ticket else {},
            "values": VALUES_TEMPLATES[self.values_template_id]["values"],
            "prev_tickets": [
                {"id": t[0], "name": t[1], "point": t[2]} for t in prev_tickets.values_list("id", "name", "final_vote")
            ],
            "votes": [
                {u.username: u.vote} for u in self.users.all()
            ]
        }


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
