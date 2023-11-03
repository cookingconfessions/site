from cloudinary.models import CloudinaryField
from rest_framework import serializers


class CloudinaryResourceURLField(serializers.Field):
    def to_representation(self, obj):
        if obj and obj.url:
            return obj.url
        return None
