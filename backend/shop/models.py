from datetime import date, datetime, time

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models

from common.models import BaseModel
from common.utils.generators import generate_code
from common.utils.sms_helper import send_order_ready_sms
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
    address_line1 = models.CharField(max_length=100)
    address_line2 = models.CharField(max_length=100, blank=True)

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
        if self.address_line2:
            return f"{self.address_line1}, {self.address_line2}, {self.country}"
        return self.address_line1


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
        (1, "New"),
        (2, "Cooking"),
        (3, "Packaging"),
        (4, "On Delivery"),
        (5, "Delivered"),
        (6, "Cancelled"),
    )
    DELIVERY_MODE = (
        (1, "Delivery"),
        (2, "Pickup"),
    )
    PAYMENT_METHOD = (
        (1, "Credit Card"),
        (2, "Cash on Delivery"),
    )

    status = models.IntegerField(choices=ORDER_STATUS, default=1)
    customer = models.ForeignKey(
        Customer, on_delete=models.SET_NULL, null=True, related_name="orders"
    )
    total = models.FloatField(validators=[MinValueValidator(limit_value=0.0)], default=0)
    order_notes = models.TextField(blank=True)
    discount_code = models.ForeignKey(
        DiscountCode, on_delete=models.SET_NULL, null=True, related_name="orders"
    )
    delivery_mode = models.IntegerField(choices=DELIVERY_MODE, default=1)
    payment_method = models.IntegerField(choices=PAYMENT_METHOD, default=1)

    def __str__(self) -> str:
        return f"Order by {self.customer.name()} On {self.created_at}"

    def save(self, *args, **kwargs):
        current_status = Order.objects.get(pk=self.pk).status if self.pk else None

        if self.status == 4 and self.status != current_status:
            send_order_ready_sms(self)

        super().save(*args, **kwargs)

    def customer_name(self):
        if not self.customer:
            return ""
        return self.customer.name()

    def customer_short_name(self):
        if not self.customer:
            return ""
        return self.customer.name().split(" ")[0]

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

    def get_items(self):
        return ",".join(map(str, self.items.all()))


class OrderItem(BaseModel):
    item = models.ForeignKey(MenuItem, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(validators=[MinValueValidator(limit_value=0)])
    total = models.FloatField(validators=[MinValueValidator(limit_value=0.0)])
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")

    def __str__(self) -> str:
        return f"{self.quantity} {self.item}"


class OrderPayment(BaseModel):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")
    payment_reference = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"Payment Ref: {self.payment_reference} paid for order {self.order.id}"


class ShopStatus(BaseModel):
    STATUS = (
        (1, "Open"),
        (2, "Closed"),
    )

    status = models.IntegerField(choices=STATUS, default=2)
    opens_at = models.DateTimeField(default=datetime.now)

    class Meta:
        verbose_name = "Shop Status"
        verbose_name_plural = "Shop Status"

    def get_status(self):
        for key, value in self.STATUS:
            if key == self.status:
                return value
        return self.status

    def __str__(self) -> str:
        return f"Shop is {self.get_status()}"
