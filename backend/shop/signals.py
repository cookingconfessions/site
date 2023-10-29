from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from .models import OrderItem


@receiver(pre_save, sender=OrderItem)
def update_order_item_total(sender, instance, **kwargs):
    if instance.item:
        instance.total = instance.quantity * instance.item.price


@receiver(post_save, sender=OrderItem)
def update_order_total(sender, instance, created, **kwargs):
    if created:
        instance.order.total += instance.total
    else:
        original_order_item = OrderItem.objects.get(pk=instance.pk)
        instance.order.total += instance.total - original_order_item.total
    instance.order.save()
