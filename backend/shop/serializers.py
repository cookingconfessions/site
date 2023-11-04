from rest_framework import serializers

from .models import *


class DiscountCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountCode
        fields = ("code", "is_active")


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password", "first_name", "last_name")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email")


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("id", "name", "email", "address", "phone_number", "country")


class CreateCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("user", "phone_number", "country", "street_address", "address_line_2")


class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()

    def get_item(self, instance):
        return instance.item.name

    class Meta:
        model = OrderItem
        fields = ("item", "quantity", "total")


class GetOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "customer_name",
            "customer_email",
            "customer_address",
            "phone_number",
            "total",
            "status",
            "order_notes",
            "discount_code",
            "items",
        )


class CreateOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("item", "quantity", "total", "order")


class CreateOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ("id", "customer", "order_notes", "discount_code", "items")
