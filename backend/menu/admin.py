from django.contrib import admin

from .models import MenuItem, MenuItemCategory, MenuItemReview, MenuItemTag


# Register your models here.
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


class MenuItemCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "image", "last_modified")
    list_display_links = ("name",)
    search_fields = ("name", "description")
    list_per_page = 20


class MenuItemTagAdmin(admin.ModelAdmin):
    list_display = ("name", "last_modified")
    list_display_links = ("name",)
    search_fields = ("name",)
    list_per_page = 20


class MenuItemReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "message", "menu_item")
    list_display_links = ("message",)
    search_fields = ("name", "message", "menu_item")
    list_per_page = 20


admin.site.site_header = "Cooking Confessions Admin"
admin.site.index_title = "Cooking Confessions"
admin.site.site_title = "Cooking Confessions"
# admin.site.site_url = "" => Todo: Update it to dynamic value based on environment

admin.site.register(MenuItemCategory, MenuItemCategoryAdmin)
admin.site.register(MenuItemTag, MenuItemTagAdmin)
admin.site.register(MenuItem, MenuItemAdmin)
admin.site.register(MenuItemReview, MenuItemReviewAdmin)
