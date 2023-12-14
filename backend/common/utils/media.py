import logging

from cloudinary import uploader


logger = logging.getLogger(__name__)


def cleanup_deleted_image(instance):
    if instance.image:
        uploader.destroy(instance.image.public_id, invalidate=True)
        logger.info(f"Deleted image {instance.image} while deleting {instance}")
