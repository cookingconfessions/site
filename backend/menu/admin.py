from django.contrib import admin

from common.utils.config import Config

from .models import MenuItem, MenuItemCategory, MenuItemReview, MenuItemTag


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "code",
        "description",
        "price",
        "is_available",
        "category",
        "display_tags",
        "image",
        "slug",
        "last_modified",
    )
    list_display_links = ("name",)
    exclude = ("slug",)
    search_fields = ("name", "description", "category", "display_tags")
    list_filter = (
        "tags",
        "category",
    )
    list_per_page = 20

    def display_tags(self, obj):
        # Retrieve and format tags for display
        return ", ".join(tag.name for tag in obj.tags.all())

    display_tags.short_description = "Tags"


@admin.register(MenuItemCategory)
class MenuItemCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "image", "last_modified")
    list_display_links = ("name",)
    search_fields = ("name", "description")
    list_per_page = 20


@admin.register(MenuItemTag)
class MenuItemTagAdmin(admin.ModelAdmin):
    list_display = ("name", "last_modified")
    list_display_links = ("name",)
    search_fields = ("name",)
    list_per_page = 20


@admin.register(MenuItemReview)
class MenuItemReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "message", "menu_item")
    list_display_links = ("message",)
    search_fields = ("name", "message", "menu_item")
    list_per_page = 20


admin.site.site_header = Config.get("ADMIN_SITE_HEADER")
admin.site.index_title = Config.get("ADMIN_INDEX_TITLE")
admin.site.site_title = Config.get("ADMIN_SITE_TITLE")
admin.site.site_url = Config.get("SITE_URL")
