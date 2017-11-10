from django.db import models
from django.conf import settings

'''
auto_now_add=True will create a warning which is inevitable according to 
https://groups.google.com/forum/#!topic/django-users/pm6F9RSEGPk

'''


class Room(models.Model):
    name = models.CharField(max_length=64)
    place = models.CharField(max_length=64)

    best_start_time = models.DateTimeField(null=True)
    best_end_time = models.DateTimeField(null=True)

    min_time_required = models.DurationField(null=True, blank=True)
    created_time = models.DateTimeField(auto_now_add=True)

    time_span_min = models.DateTimeField(null=True)
    time_span_max = models.DateTimeField(null=True)

    min_members = models.IntegerField(default=0)

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='owned_rooms',
        null=False
    )

    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='joined_rooms',
    )
