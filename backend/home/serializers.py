from common.serializers import CloudinaryResourceURLField
from django_countries import countries
from rest_framework import serializers

from .models import *


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ("name", "email", "phone_number", "location", "date", "time", "message")


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = ("id", "question", "answer")


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ("name", "email", "phone_number", "location", "message")


class CompanyInfoSerializer(serializers.ModelSerializer):
    countries = serializers.SerializerMethodField()

    def get_countries(self, instance: CompanyInfo):
        countries_dict = dict(countries)
        countries_list = []

        for country in instance.countries:
            countries_list.append(countries_dict.get(country))

        return countries_list

    class Meta:
        model = CompanyInfo
        exclude = ("id", "created_at", "last_modified")


class BannerItemSerializer(serializers.ModelSerializer):
    image = CloudinaryResourceURLField()

    class Meta:
        model = BannerItem
        fields = ("id", "name", "description", "image", "slug")


class ScheduleSerializer(serializers.ModelSerializer):
    day = serializers.SerializerMethodField()
    opens_at = serializers.TimeField(format="%I:%M %p")
    closes_at = serializers.TimeField(format="%I:%M %p")

    def get_day(self, instance: Schedule):
        for key, value in instance.DAYS_OF_WEEK:
            if key == instance.day:
                return value
        return instance.day

    class Meta:
        model = Schedule
        exclude = ("id", "created_at", "last_modified")
