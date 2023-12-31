import logging
from datetime import datetime

from django.core.validators import MinValueValidator
from django.db import models
from django.utils.text import slugify

from cloudinary import uploader
from cloudinary.models import CloudinaryField
from common.models import BaseModel
from common.utils.media import cleanup_deleted_image
from django_countries.fields import CountryField

from .utils.validators import validate_closing_time_gt_opening_time


logger = logging.getLogger(__name__)

# Create your models here.


class BannerItem(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
    slug = models.SlugField(unique=True)
    image = CloudinaryField("image")

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)

        try:
            existing_object = BannerItem.objects.get(pk=self.pk)
            if str(existing_object.image) != str(self.image):
                uploader.destroy(existing_object.image.public_id, invalidate=True)
                logger.info(f"Deleted old image {existing_object.image} while saving new image")
        except BannerItem.DoesNotExist:
            pass

        super(BannerItem, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        cleanup_deleted_image(self)

        super().delete(*args, **kwargs)

    def __str__(self):
        return f"Banner {self.id} {self.name}"

    class Meta:
        verbose_name = "Banner Item"
        verbose_name_plural = "Banner Items"


class Schedule(BaseModel):
    DAYS_OF_WEEK = (
        ("mon", "Monday"),
        ("tue", "Tuesday"),
        ("wed", "Wednesday"),
        ("thu", "Thursday"),
        ("fri", "Friday"),
        ("sat", "Saturday"),
        ("sun", "Sunday"),
    )

    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK, unique=True)
    opens_at = models.TimeField()
    closes_at = models.TimeField()

    class Meta:
        verbose_name = "Schedule"
        verbose_name_plural = "Schedule"

    def clean(self):
        validate_closing_time_gt_opening_time(self.opens_at, self.closes_at)
        super().clean()

    def __str__(self):
        return f"{self.get_day_display()}: {self.opens_at.strftime('%I:%M %p')} - {self.closes_at.strftime('%I:%M %p')}"


class Message(BaseModel):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return f"{self.message} from {self.name}"


class Booking(BaseModel):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    date = models.DateField(
        validators=[MinValueValidator(limit_value=datetime.now().date())],
        help_text="Booking a past date is not allowed",
    )
    time = models.TimeField()
    message = models.TextField()

    class Meta:
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"

    def __str__(self):
        return f"{self.name} booked catering on {self.date} at {self.time}"


class Faq(BaseModel):
    question = models.CharField(max_length=300)
    answer = models.TextField()

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQS"

    def __str__(self) -> str:
        return self.question


class CompanyInfo(BaseModel):
    name = models.CharField(max_length=100, default="Cooking Confessions", unique=True)
    description = models.TextField()
    address_line_1 = models.CharField(max_length=100, help_text="Somewhere 1", unique=True)
    address_line_2 = models.CharField(max_length=100, help_text="Dinner City", unique=True)
    email = models.EmailField(max_length=100, help_text="someone@company.com", unique=True)
    phone_numbers = models.CharField(
        max_length=150, help_text="+123 456 789 123, +124 456 789 124", unique=True
    )
    facebook_link = models.CharField(
        max_length=100, help_text="https://www.facebook.com/pages/Page-Name/Page-ID", unique=True
    )
    instagram_link = models.CharField(
        max_length=100, help_text="https://www.instagram.com/username/", unique=True
    )
    tiktok_link = models.CharField(
        max_length=100, help_text="https://www.tiktok.com/@username", unique=True
    )
    countries = CountryField(multiple=True)
    delivery_fee = models.FloatField(default=3.50)

    class Meta:
        verbose_name = "Company Info"
        verbose_name_plural = "Company Info"

    def __str__(self) -> str:
        return f"{self.name}, {self.address_line_1}, {self.address_line_2}"
