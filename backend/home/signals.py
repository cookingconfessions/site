from django.db.models.signals import post_delete
from django.dispatch import receiver

from common.utils.media import cleanup_deleted_image

from .models import BannerItem


@receiver(post_delete, sender=BannerItem)
def delete_banner_item_image(sender, instance, **kwargs):
    cleanup_deleted_image(instance)
