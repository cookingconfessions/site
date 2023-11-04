from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register("bookings", BookingView, basename="bookings")
router.register("faqs", FaqView, basename="faqs")
router.register("contact", MessageView, basename="contact")
router.register("info", CompanyInfoView, basename="info")
router.register("banner-items", BannerItemView, basename="banneritems")

urlpatterns = router.urls
