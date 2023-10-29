# Generated by Django 4.2.4 on 2023-10-28 15:08

import cloudinary.models
import datetime
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("menu", "0003_alter_menuitem_code"),
    ]

    operations = [
        migrations.CreateModel(
            name="Booking",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("last_modified", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=100)),
                ("phone_number", models.CharField(max_length=100)),
                ("location", models.CharField(max_length=100)),
                (
                    "date",
                    models.DateField(
                        help_text="Booking a past date is not allowed",
                        validators=[
                            django.core.validators.MinValueValidator(
                                limit_value=datetime.date(2023, 10, 28)
                            )
                        ],
                    ),
                ),
                ("time", models.TimeField()),
                ("message", models.TextField()),
            ],
            options={
                "verbose_name": "Booking",
                "verbose_name_plural": "Bookings",
            },
        ),
        migrations.CreateModel(
            name="CompanyInfo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("last_modified", models.DateTimeField(auto_now=True)),
                (
                    "name",
                    models.CharField(default="Cooking Confessions", max_length=100, unique=True),
                ),
                (
                    "address_line_1",
                    models.CharField(help_text="Somewhere 1", max_length=100, unique=True),
                ),
                (
                    "address_line_2",
                    models.CharField(help_text="Dinner City", max_length=100, unique=True),
                ),
                (
                    "email",
                    models.EmailField(help_text="someone@company.com", max_length=100, unique=True),
                ),
                (
                    "phone_numbers",
                    models.CharField(
                        help_text="+123 456 789 123, +124 456 789 124", max_length=150, unique=True
                    ),
                ),
                (
                    "facebook_link",
                    models.CharField(
                        help_text="https://www.facebook.com/pages/Page-Name/Page-ID",
                        max_length=100,
                        unique=True,
                    ),
                ),
                (
                    "instagram_link",
                    models.CharField(
                        help_text="https://www.instagram.com/username/", max_length=100, unique=True
                    ),
                ),
                (
                    "tiktok_link",
                    models.CharField(
                        help_text="https://www.tiktok.com/@username", max_length=100, unique=True
                    ),
                ),
            ],
            options={
                "verbose_name": "Company Info",
                "verbose_name_plural": "Company Info",
            },
        ),
        migrations.CreateModel(
            name="Faq",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("last_modified", models.DateTimeField(auto_now=True)),
                ("question", models.CharField(max_length=300)),
                ("answer", models.TextField()),
            ],
            options={
                "verbose_name": "FAQ",
                "verbose_name_plural": "FAQS",
            },
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("last_modified", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=100)),
                ("phone_number", models.CharField(max_length=100)),
                ("location", models.CharField(max_length=100)),
                ("message", models.TextField()),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Schedule",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("last_modified", models.DateTimeField(auto_now=True)),
                (
                    "day",
                    models.CharField(
                        choices=[
                            ("mon", "Monday"),
                            ("tue", "Tuesday"),
                            ("wed", "Wednesday"),
                            ("thu", "Thursday"),
                            ("fri", "Friday"),
                            ("sat", "Saturday"),
                            ("sun", "Sunday"),
                        ],
                        max_length=3,
                        unique=True,
                    ),
                ),
                ("opens_at", models.TimeField()),
                ("closes_at", models.TimeField()),
            ],
            options={
                "verbose_name": "Schedule",
                "verbose_name_plural": "Schedule",
            },
        ),
        migrations.CreateModel(
            name="BannerItem",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("last_modified", models.DateTimeField(auto_now=True)),
                ("image", cloudinary.models.CloudinaryField(max_length=255, verbose_name="image")),
                (
                    "menu_item",
                    models.ForeignKey(
                        blank=True, on_delete=django.db.models.deletion.CASCADE, to="menu.menuitem"
                    ),
                ),
            ],
            options={
                "verbose_name": "Banner Item",
                "verbose_name_plural": "Banner Items",
            },
        ),
    ]