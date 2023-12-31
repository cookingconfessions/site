from common.serializers import CloudinaryResourceURLField
from rest_framework import serializers

from .models import *


class MenuItemCategorySerializer(serializers.ModelSerializer):
    image = CloudinaryResourceURLField()

    class Meta:
        model = MenuItemCategory
        fields = ("id", "name", "description", "image")


class MenuItemTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemTag
        exclude = ("created_at", "last_modified")


class MenuItemAllergenSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemAllergen
        exclude = ("created_at", "last_modified")


class MenuItemReviewSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%d %B %Y")

    class Meta:
        model = MenuItemReview
        fields = ("id", "name", "email", "message", "is_visible", "created_at", "replies")

    def get_replies(self, obj):
        # Get the child reviews (replies) for the current review
        replies = MenuItemReview.objects.filter(parent=obj)
        # Serialize child reviews using the same serializer
        reply_serializer = MenuItemReviewSerializer(replies, many=True)
        return reply_serializer.data


class MenuItemSerializer(serializers.ModelSerializer):
    image = CloudinaryResourceURLField()
    category = serializers.SerializerMethodField()
    reviews = MenuItemReviewSerializer(many=True)
    tags = MenuItemTagSerializer(many=True)
    allergens = MenuItemAllergenSerializer(many=True)

    def get_category(self, instance):
        if instance.category:
            return instance.category.name
        return ""

    class Meta:
        model = MenuItem
        exclude = ("created_at", "last_modified", "sales_count")


class CreateMenuItemReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemReview
        exclude = ("is_visible", "id")
