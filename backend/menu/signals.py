from django.db.models.signals import post_delete
from django.dispatch import receiver

from common.utils.media import cleanup_deleted_image
from menu.models import MenuItem, MenuItemCategory


@receiver(post_delete, sender=MenuItemCategory)
def delete_menu_category_image(sender, instance, **kwargs):
    cleanup_deleted_image(instance)


@receiver(post_delete, sender=MenuItem)
def delete_menu_item_image(sender, instance, **kwargs):
    cleanup_deleted_image(instance)
