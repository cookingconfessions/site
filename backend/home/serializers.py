from common.serializers import CloudinaryResourceURLField
from django_countries.serializers import CountryFieldMixin
from rest_framework import serializers

from .models import *


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ("name", "email", "phone_number", "location", "date", "time", "message")


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = ("question", "answer")


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ("name", "email", "phone_number", "location", "message")


class CompanyInfoSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        exclude = ("created_at", "last_modified")
