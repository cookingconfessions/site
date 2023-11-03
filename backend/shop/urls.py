from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()
router.register("discountcodes", DiscountCodeView, basename="discountcodes")

urlpatterns = [
    path("", include(router.urls)),
    path("customers/", CustomerView.as_view(), name="customers"),
    path("orders/", OrderView.as_view(), name="orders"),
]
