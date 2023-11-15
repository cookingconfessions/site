import re
import secrets
import string
from typing import List

from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import *
from .serializers import *


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

            return Response(response.data, status=status.HTTP_201_CREATED)
        return Response(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def are_user_details_valid(self, data: dict):
        print(data)

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
