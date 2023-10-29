from django.contrib import admin

from shop.models import Customer, DiscountCode, Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    exclude = ("total",)


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone_number", "country", "street_address", "address_line_2")
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
        "created_at",
    )
    search_fields = ("customer_name", "pnone_number", "items", "address")
    list_display_links = ("customer_name", "items")
    list_filter = ("created_at",)
    sortable_by = ("created_at",)
    exclude = ("total",)
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
