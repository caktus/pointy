from django.contrib import admin

from . import models


class InlineRoomUser(admin.TabularInline):
    model = models.RoomUser


class InlineRoomTicket(admin.TabularInline):
    model = models.RoomTicket


@admin.register(models.PointyRoom)
class PointyRoomAdmin(admin.ModelAdmin):
    list_display = [
        "name", "session_id", "admin_name",
        "values_template_id", "phase", "last_access_dt",
    ]
    filter_fields = ["name", "admin_name", "phase", "values_template_id"]
    inlines = [InlineRoomUser, InlineRoomTicket]
