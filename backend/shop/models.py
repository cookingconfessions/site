from datetime import date, datetime, time

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models

from common.models import BaseModel
from common.utils.generators import generate_code
from menu.models import MenuItem
from shop.utils.validators import validate_discount_code_not_already_expired


class ShopHelper:
    @staticmethod
    def generate_unique_discount_code():
        code = generate_code()

        while DiscountCode.objects.filter(code=code).exists():
            code = generate_code()

        return code


# Create your models here.
class Customer(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=50)
    country = models.CharField(max_length=100)
    street_address = models.CharField(max_length=100)
    address_line_2 = models.CharField(max_length=100, default="")

    def __str__(self) -> str:
        return self.name()

    def name(self):
        if not self.user:
            return ""
        return f"{self.user.first_name} {self.user.last_name}"

    def email(self):
        if not self.user:
            return ""
        return self.user.email

    def address(self):
        if self.address_line_2:
            return f"{self.street_address}, {self.address_line_2}, {self.country}"
        return self.street_address


class DiscountCode(BaseModel):
    code = models.CharField(max_length=5, default=ShopHelper.generate_unique_discount_code)
    discount_percentage = models.FloatField(validators=[MinValueValidator(limit_value=0.0)])
    expiry_date = models.DateField()
    expiry_time = models.TimeField(default=time(0, 0, 0))

    class Meta:
        verbose_name = "Discount Code"
        verbose_name_plural = "Discount Codes"

    def __str__(self) -> str:
        return f"{self.code} valid until {self.expiry_date} {self.expiry_time}"

    def clean(self, *args, **kwargs):
        validate_discount_code_not_already_expired(self.expiry_date, self.expiry_time)
        super().save(*args, **kwargs)

    def is_active(self):
        current_date = date.today()
        current_time = datetime.now().time()

        if current_date <= self.expiry_date and current_time <= self.expiry_time:
            return True
        else:
            return False


class Order(BaseModel):
    ORDER_STATUS = (
        (1, "Received"),
        (2, "Cooking"),
        (3, "Packaging"),
        (4, "OnDelivery"),
        (5, "Delivered"),
    )

    status = models.IntegerField(choices=ORDER_STATUS, default=1)
    customer = models.ForeignKey(
        Customer, on_delete=models.SET_NULL, null=True, related_name="orders"
    )
    total = models.FloatField(validators=[MinValueValidator(limit_value=0.0)], default=0)
    order_notes = models.TextField(default="")
    discount_code = models.ForeignKey(
        DiscountCode, on_delete=models.SET_NULL, null=True, related_name="orders"
    )

    def __str__(self) -> str:
        return f"Order by {self.customer.name()} On {self.created_at}"

    def customer_name(self):
        if not self.customer:
            return ""
        return self.customer.name()

    def customer_email(self):
        if not self.customer:
            return ""
        return self.customer.email()

    def phone_number(self):
        if not self.customer:
            return ""
        return self.customer.phone_number

    def customer_address(self):
        if not self.customer:
            return ""
        return self.customer.address()


class OrderItem(BaseModel):
    item = models.ForeignKey(MenuItem, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(validators=[MinValueValidator(limit_value=0)])
    total = models.FloatField(validators=[MinValueValidator(limit_value=0.0)])
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")

    def __str__(self) -> str:
        return f"{self.quantity} {self.item.name}"