from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()
router.register("items", MenuItemsView, basename="menuitems")
router.register("categories", CategoriesView, basename="categories")

urlpatterns = [path("", include(router.urls)), path("tags/", TagsView.as_view(), name="tags")]
