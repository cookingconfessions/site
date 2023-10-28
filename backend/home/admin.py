from django.contrib import admin

from .models import BannerItem, Booking, CompanyInfo, Faq, Message, Schedule


class BannerItemAdmin(admin.ModelAdmin):
    list_display = ("menu_item", "image")
    list_display_links = ("menu_item",)


class ScheduleAdmin(admin.ModelAdmin):
    list_display = ("day", "opens_at", "closes_at")


class MessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone_number", "location", "message")
    search_fields = ("name", "phone_number")
    list_per_page = 20
    sortable_by = ("created_at",)


class BookingAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone_number", "location", "date", "time", "message")
    search_fields = ("name", "email", "phone_number")
    list_filter = ("date",)
    sortable_by = ("last_modified", "date")


class FaqAdmin(admin.ModelAdmin):
    list_display = ("question", "answer")
    search_fields = ("question", "answer")


class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "address_line_1",
        "address_line_2",
        "email",
        "phone_numbers",
        "facebook_link",
        "instagram_link",
        "tiktok_link",
    )


admin.site.register(BannerItem, BannerItemAdmin)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(Faq, FaqAdmin)
admin.site.register(CompanyInfo, CompanyInfoAdmin)
