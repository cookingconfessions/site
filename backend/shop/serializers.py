from rest_framework import serializers

from .models import *


class DiscountCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountCode
        fields = ("code", "is_active", "discount_percentage")


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password", "first_name", "last_name")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email")


class CustomerSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    def get_first_name(self, instance):
        return instance.user.first_name

    def get_last_name(self, instance):
        return instance.user.last_name

    class Meta:
        model = Customer
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "address_line1",
            "address_line2",
            "phone_number",
            "country",
        )


class CreateCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("user", "phone_number", "country", "address_line1", "address_line2")


class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()

    def get_item(self, instance):
        return instance.item.name

    class Meta:
        model = OrderItem
        fields = ("item", "quantity", "total")


class GetOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    status = serializers.SerializerMethodField()
    delivery_mode = serializers.SerializerMethodField()
    payment_method = serializers.SerializerMethodField()

    def get_status(self, instance: Order):
        for key, value in instance.ORDER_STATUS:
            if key == instance.status:
                return value
        return instance.status

    def get_delivery_mode(self, instance: Order):
        for key, value in instance.DELIVERY_MODE:
            if key == instance.delivery_mode:
                return value
        return instance.delivery_mode

    def get_payment_method(self, instance: Order):
        for key, value in instance.PAYMENT_METHOD:
            if key == instance.payment_method:
                return value
        return instance.payment_method

    class Meta:
        model = Order
        fields = (
            "id",
            "customer_name",
            "customer_email",
            "customer_address",
            "phone_number",
            "total",
            "status",
            "order_notes",
            "discount_code",
            "delivery_mode",
            "payment_method",
            "items",
        )


class CreateOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("item", "quantity", "total", "order")


class CreateOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    order_notes = serializers.CharField(required=False, default="")

    class Meta:
        model = Order
        fields = (
            "id",
            "customer",
            "order_notes",
            "discount_code",
            "delivery_mode",
            "payment_method",
            "items",
        )


class OrderPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderPayment
        fields = ("order", "payment_reference")
