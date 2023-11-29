from django.db.models.signals import post_delete, post_save, pre_save
from django.dispatch import receiver

from common.utils.sms_helper import send_new_order_sms

from .models import Order, OrderItem, OrderPayment


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


@receiver(pre_save, sender=OrderItem)
def update_sales_count_on_order_item_pre_save(sender, instance, **kwargs):
    if instance.item:
        # Check if the OrderItem already exists
        if instance.pk:
            try:
                # Retrieve the current OrderItem
                current_order_item = OrderItem.objects.get(pk=instance.pk)

                # Check if the associated MenuItem has changed
                if current_order_item.item != instance.item:
                    # Decrement the sales_count of the previous item
                    current_order_item.item.sales_count -= current_order_item.quantity
                    if current_order_item.item.sales_count < 0:
                        current_order_item.item.sales_count = 0
                    current_order_item.item.save()

                # Update the sales_count of the new MenuItem
                instance.item.sales_count += current_order_item.quantity
                instance.item.save()

            except OrderItem.DoesNotExist:
                pass
        else:
            # If it's a new OrderItem, just increment the sales_count of the item
            instance.item.sales_count += instance.quantity
            instance.item.save()


@receiver(post_delete, sender=OrderItem)
def decrement_sales_count(sender, instance, **kwargs):
    item = instance.item
    item.sales_count -= instance.quantity  # Decrement sales count
    item.save()


@receiver(post_save, sender=Order)
def send_sms_notification(sender, instance: Order, **kwargs):
    if kwargs["created"] and instance.payment_method == 2:
        send_new_order_sms(instance)


@receiver(post_save, sender=OrderPayment)
def send_sms_notification(sender, instance: Order, **kwargs):
    if kwargs["created"]:
        send_new_order_sms(instance)
