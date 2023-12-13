import logging

from cloudinary import uploader


logger = logging.getLogger(__name__)


def cleanup_deleted_image(instance):
    if instance.image:
        public_id = instance.image.public_id
        uploader.destroy(public_id, invalidate=True)
        logger.info(
            f"Deleted image {instance.image} while deleting {instance}")
