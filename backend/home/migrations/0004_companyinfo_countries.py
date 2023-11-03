# Generated by Django 4.2.4 on 2023-11-01 15:21

from django.db import migrations
import django_countries.fields


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0003_alter_booking_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="companyinfo",
            name="countries",
            field=django_countries.fields.CountryField(default="SK", max_length=746, multiple=True),
            preserve_default=False,
        ),
    ]
