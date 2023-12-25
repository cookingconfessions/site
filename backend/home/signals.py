from django.db.models.signals import post_save
from django.dispatch import receiver

from common.utils.sms_helper import send_new_booking_sms, send_new_message_sms

from .models import Booking, Message


@receiver(post_save, sender=Booking)
def send_booking_notification(sender, instance, created, **kwargs):
    if created:
        send_new_booking_sms(instance)


@receiver(post_save, sender=Message)
def send_message_notification(sender, instance, created, **kwargs):
    if created:
        send_new_message_sms(instance)
