from django.contrib import admin

from .models import BannerItem, Booking, CompanyInfo, Faq, Message, Schedule


@admin.register(BannerItem)
class BannerItemAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "image", "last_modified")
    list_display_links = ("name",)


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ("day", "opens_at", "closes_at")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone_number", "location", "message")
    search_fields = ("name", "phone_number")
    list_per_page = 20
    sortable_by = ("created_at",)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone_number", "location", "date", "time", "message")
    search_fields = ("name", "email", "phone_number")
    list_filter = ("date",)
    sortable_by = ("last_modified", "date")


@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ("question", "answer")
    search_fields = ("question", "answer")


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "address_line_1",
        "address_line_2",
        "email",
        "phone_numbers",
        "facebook_link",
        "instagram_link",
        "tiktok_link",
    )
