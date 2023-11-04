from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register("items", MenuItemsView, basename="menuitems")
router.register("categories", CategoriesView, basename="categories")
router.register("tags", TagsView, basename="tags")

urlpatterns = router.urls
