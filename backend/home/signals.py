from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from cloudinary import uploader
from common.utils.media import cleanup_deleted_image

from .models import BannerItem


@receiver(post_delete, sender=BannerItem)
def delete_banner_item_image(sender, instance, **kwargs):
    cleanup_deleted_image(instance)


@receiver(pre_save, sender=BannerItem)
def delete_previous_image(sender, instance, **kwargs):
    # Check if the instance is being updated
    if instance.pk:
        # Retrieve the current instance from the database
        current_instance = BannerItem.objects.get(pk=instance.pk)

        # Check if the image field has changed
        if current_instance.image != instance.image:
            # Delete the previous image from Cloudinary
            uploader.destroy(current_instance.image.public_id, invalidate=True)
