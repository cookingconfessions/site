from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register("discountcodes", DiscountCodeView, basename="discountcodes")
router.register("customers", CustomerView, basename="customers")
router.register("orders", OrderView, basename="orders")
router.register("checkout", CreateCheckoutSession, basename="checkout")
router.register("webhook", StripeWebhookView, basename="webhook")

urlpatterns = router.urls
