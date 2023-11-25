from django.db.models.signals import pre_save
from cloudinary import uploader
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


@receiver(pre_save, sender=MenuItem)
def delete_previous_image(sender, instance, **kwargs):
    # Check if the instance is being updated
    if instance.pk:
        # Retrieve the current instance from the database
        current_instance = MenuItem.objects.get(pk=instance.pk)

        # Check if the image field has changed
        if current_instance.image != instance.image:
            # Delete the previous image from Cloudinary
            uploader.destroy(current_instance.image.public_id, invalidate=True)
