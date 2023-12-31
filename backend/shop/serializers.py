from django.utils import timezone

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
    address_line2 = serializers.CharField(allow_blank=True, allow_null=True)
    is_new_customer = serializers.BooleanField(default=False)

    def get_first_name(self, instance):
        if instance.user:
            return instance.user.first_name
        return ""

    def get_last_name(self, instance):
        if instance.user:
            return instance.user.last_name
        return ""

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
            "is_new_customer",
        )


class CreateCustomerSerializer(serializers.ModelSerializer):
    address_line2 = serializers.CharField(allow_blank=True, allow_null=True)

    class Meta:
        model = Customer
        fields = ("user", "phone_number", "country", "address_line1", "address_line2")


class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()

    def get_item(self, instance):
        if instance.item:
            return instance.item.name
        return ""

    class Meta:
        model = OrderItem
        fields = ("item", "quantity", "total")


class GetOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    status = serializers.SerializerMethodField()
    delivery_mode = serializers.SerializerMethodField()
    payment_method = serializers.SerializerMethodField()
    order_notes = serializers.CharField(allow_blank=True, allow_null=True)

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
    order_notes = serializers.CharField(allow_blank=True, allow_null=True)

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


class ShopStatusSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    opens_at = serializers.SerializerMethodField()

    def get_status(self, instance):
        for key, value in instance.STATUS:
            if key == instance.status:
                return value
        return instance.status

    def get_opens_at(self, instance):
        return timezone.localtime(instance.opens_at).strftime("%A %I:%M %p")

    class Meta:
        model = ShopStatus
        fields = ("status", "opens_at")
