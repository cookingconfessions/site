from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register("discountcodes", DiscountCodeView, basename="discountcodes")
router.register("customers", CustomerView, basename="customers")
router.register("orders", OrderView, basename="orders")
router.register("checkout", CheckoutView, basename="checkout")
router.register("status", ShopStatusView, basename="status")

urlpatterns = router.urls
