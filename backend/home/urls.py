from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register("banner-items", BannerItemView, basename="banneritems")
router.register("schedule", ScheduleView, basename="schedule")
router.register("bookings", BookingView, basename="bookings")
router.register("faqs", FaqView, basename="faqs")
router.register("contact", MessageView, basename="contact")
router.register("info", CompanyInfoView, basename="info")

urlpatterns = router.urls
