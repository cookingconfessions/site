import logging
import re
import secrets
import string
from typing import List

from django.db import transaction

import stripe
from common.utils.sms_helper import send_new_order_sms
from psycopg2 import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import *
from .serializers import *


logger = logging.getLogger(__name__)


class DiscountCodeView(viewsets.ViewSet):
    serializer_class = DiscountCodeSerializer
    queryset = DiscountCode.objects.all()
    lookup_field = "code"

    def list(self, *args, **kwargs):
        codes = self.get_queryset()
        serializer = self.get_serializer(codes, many=True)
        return Response(serializer.data)

    def retrieve(self, request, code=None):
        try:
            discount_code = DiscountCode.objects.get(code=code)
        except DiscountCode.DoesNotExist:
            return Response(
                {"error": "Discount code does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = DiscountCodeSerializer(discount_code)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomerView(viewsets.ViewSet):
    serializer_class = CreateCustomerSerializer
    queryset = Customer.objects.all()

    def create(self, request, *args, **kwargs):
        if not self.are_user_details_valid(request.data):
            Response({"error": "Missing details"},
                     status=status.HTTP_400_BAD_REQUEST)
        email = request.data.pop("email")

        try:
            user = User.objects.get(email=email)
            customer = Customer.objects.get(user=user.id)
            response = CustomerSerializer(customer)
            return Response(response.data, status=status.HTTP_200_OK)
        except (User.DoesNotExist, Customer.DoesNotExist) as e:
            username = self.generate_unique_username(email)
            password = self.generate_otp()
            user_serializer = CreateUserSerializer(
                data={
                    "first_name": request.data.pop("first_name"),
                    "last_name": request.data.pop("last_name"),
                    "email": email,
                    "username": username,
                    "password": password,
                }
            )

            if not user_serializer.is_valid():
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            user = user_serializer.save()
            customer_serializer = CreateCustomerSerializer(
                data={**request.data, "user": user.id})

            if customer_serializer.is_valid():
                customer = customer_serializer.save()
                response = CustomerSerializer(customer)

                return Response(
                    {**response.data, "is_new_customer": True}, status=status.HTTP_201_CREATED
                )
            return Response(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def are_user_details_valid(self, data: dict):
        if (
            data["email"]
            and data["first_name"]
            and data["last_name"]
            and data["phone_number"]
            and data["country"]
            and data["address_line1"]
        ):
            return True
        else:
            return False

    def generate_otp(self, length=8):
        characters = string.digits
        otp = "".join(secrets.choice(characters) for _ in range(length))
        return otp

    def generate_unique_username(self, email):
        local_part = email.split("@")[0]
        local_part = re.sub(r"[^a-zA-Z0-9]", "", local_part).lower()
        username = local_part
        suffix = 1

        while User.objects.filter(username=username).exists():
            # If the username already exists, add a numeric suffix to make it unique
            username = f"{local_part}{suffix}"
            suffix += 1

        return username


class OrderView(viewsets.ViewSet):
    serializer_class = CreateOrderSerializer
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        if not self.are_order_details_valid(request.data):
            return Response({"error": "Invalid order details"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            customer = Customer.objects.get(pk=request.data["customer"])
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

        discount_code = None  # Initialize discount_code
        if request.data["discount_code"]:
            try:
                discount_code = DiscountCode.objects.get(
                    code=request.data["discount_code"])
            except DiscountCode.DoesNotExist:
                return Response(
                    {"error": "Discount code not found"}, status=status.HTTP_404_NOT_FOUND
                )

        serializer = CreateOrderSerializer(
            data={
                "order_notes": request.data["order_notes"],
                "customer": customer.id,
                "payment_method": request.data["payment_method"],
                "delivery_mode": request.data["delivery_mode"],
                # Use discount_code if defined
                "discount_code": discount_code.id if discount_code else None,
            }
        )

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        order = serializer.save()  # Save the order
        order_items = list(request.data["items"])

        if not order_items:
            return Response(
                {"error": "No order items were provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        self.create_order_items(order_items, order)
        response = GetOrderSerializer(order)
        self.send_sms_notification(order.id)

        return Response(response.data, status=status.HTTP_201_CREATED)

    def are_order_details_valid(self, data: dict):
        if data["customer"] and data["items"]:
            return True
        return False

    def create_order_items(self, order_items: List[dict], order: dict):
        for order_item in order_items:
            serializer = CreateOrderItemSerializer(
                data={**order_item, "order": order.id})

            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()

    def send_sms_notification(self, order_id):
        try:
            order = Order.objects.get(pk=order_id)
            send_new_order_sms(order)
        except Exception as e:
            logger.error(
                f"An error occured while sending a notification for {order}: {str(e)}")
            return


class CheckoutView(viewsets.ViewSet):
    def create(self, request):
        if request.data["total"] is None:
            return Response(
                {"error": "Payment amount was not provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        if request.data["total"] < 1:
            return Response(
                {"error": "Payment amount must be greater than 0"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            intent = stripe.PaymentIntent.create(
                amount=self.convert_to_cents(request.data["total"]),
                currency="EUR",
                automatic_payment_methods={
                    "enabled": True,
                },
            )

            return Response(
                {
                    "client_secret": intent.client_secret,
                    "payment_intent_id": intent.id,
                    "amount": request.data["total"],
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=["post"], url_path="successful")
    def checkout_successful(self, request):
        if not request.data["payment_intent_id"]:
            return Response(
                {"error": "Payment intent was not provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        if not request.data["order_id"]:
            return Response({"error": "Order was not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            payment = OrderPayment.objects.get(order=request.data["order_id"])

            # Payment already exists, return the response
            serializer = OrderPaymentSerializer(payment)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except OrderPayment.DoesNotExist:
            try:
                # Payment doesn't exist, create a new payment instance
                serializer = OrderPaymentSerializer(
                    data={
                        "order": request.data["order_id"],
                        "payment_reference": request.data["payment_intent_id"],
                    }
                )
                with transaction.atomic():
                    if not serializer.is_valid():
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                    serializer.save()

                self.send_sms_notification(request.data["order_id"])

                return Response(serializer.data, status=status.HTTP_200_OK)

            except IntegrityError as e:
                # Handle IntegrityError if needed
                return Response({"message": "Payment saved"}, status=status.HTTP_200_OK)

    def send_sms_notification(self, order_id):
        try:
            order = Order.objects.get(pk=order_id)
            send_new_order_sms(order)
        except Exception as e:
            logger.error(
                f"An error occured while sending a notification for {order}: {str(e)}")
            return

    def convert_to_cents(self, price):
        float_price = round(float(price), 2)
        return round(float_price * 100)


class ShopStatusView(viewsets.ViewSet):
    serializer_class = ShopStatusSerializer

    def list(self, request, *args, **kwargs):
        queryset = ShopStatus.objects.first()
        serializer = self.serializer_class(queryset, many=False)
        return Response(serializer.data)
