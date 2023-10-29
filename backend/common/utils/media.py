from cloudinary import uploader


def cleanup_deleted_image(instance):
    if instance.image:
        public_id = instance.image.public_id
        uploader.destroy(public_id)
