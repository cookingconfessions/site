from common.serializers import CloudinaryResourceURLField
from rest_framework import serializers

from .models import *


class MenuItemCategorySerializer(serializers.ModelSerializer):
    image = CloudinaryResourceURLField()

    class Meta:
        model = MenuItemCategory
        fields = "__all__"


class MenuItemTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemTag
        fields = "__all__"


class MenuItemReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemReview
        exclude = ("created_at", "last_modified")


class MenuItemSerializer(serializers.ModelSerializer):
    image = CloudinaryResourceURLField()
    category = MenuItemCategorySerializer()
    tags = MenuItemTagSerializer(many=True)
    reviews = MenuItemReviewSerializer(many=True)

    class Meta:
        model = MenuItem
        fields = "__all__"


class CreateMenuItemReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemReview
        exclude = ("is_visible", "id")
