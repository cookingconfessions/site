# Generated by Django 4.2.4 on 2023-11-15 09:18

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0008_alter_booking_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="companyinfo",
            name="delivery_fee",
            field=models.FloatField(default=3.5),
        ),
    ]
