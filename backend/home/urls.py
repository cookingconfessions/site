from django.urls import path

from .views import *


urlpatterns = [
    path("booking/", BookingView.as_view(), name="bookings"),
    path("faqs/", FaqView.as_view(), name="faqs"),
    path("contact/", MessageView.as_view(), name="contact"),
    path("info/", CompanyInfoView.as_view(), name="info"),
]
