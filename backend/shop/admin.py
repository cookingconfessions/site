from django.contrib import admin

from shop.models import *


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    exclude = ("total",)


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone_number", "country",
                    "address_line1", "address_line2")
    list_display_links = ("name",)
    search_fields = ("name",)
    list_per_page = 20


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("item", "quantity", "total", "order", "created_at")
    list_display_links = ("item",)
    list_filter = ("order",)
    sortable_by = ("order",)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "customer_name",
        "customer_email",
        "phone_number",
        "customer_address",
        "total",
        "status",
        "items",
        "order_notes",
        "delivery_mode",
        "payment_method",
        "payment",
        "created_at",
    )
    search_fields = ("customer_name", "pnone_number", "items", "address")
    list_display_links = ("customer_name", "items")
    list_filter = ("created_at", "payment_method", "delivery_mode", "status")
    sortable_by = ("created_at", "payment_method", "delivery_mode", "status")
    exclude = ("total", "discount_code")
    list_per_page = 20
    inlines = [OrderItemInline]

    def items(self, obj):
        return ", ".join(str(item) for item in obj.items.all())

    items.short_description = "Items"


@admin.register(DiscountCode)
class DiscountCodeAdmin(admin.ModelAdmin):
    list_display = (
        "code",
        "is_active",
        "discount_percentage",
        "created_at",
        "expiry_date",
        "expiry_time",
    )
    search_fields = ("code",)
    sortable_by = ("expiry_date",)
    list_filter = ("expiry_date",)


@admin.register(OrderPayment)
class OrderPaymentAdmin(admin.ModelAdmin):
    list_display = ("order", "payment_reference", "created_at")
    list_display_links = ("order",)
    search_fields = ("order__customer_name",
                     "order__customer_email", "order__phone_number")
    list_per_page = 20


@admin.register(ShopStatus)
class ShopStatusAdmin(admin.ModelAdmin):
    list_display = ("is_open", "opens_at")
    list_display_links = ("opens_at",)
    sortable_by = ("opens_at",)
    list_per_page = 20
