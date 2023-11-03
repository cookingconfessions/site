# Generated by Django 4.2.4 on 2023-11-01 11:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("shop", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.IntegerField(
                choices=[
                    (1, "New"),
                    (2, "Cooking"),
                    (3, "Packaging"),
                    (4, "OnDelivery"),
                    (5, "Delivered"),
                    (6, "Cancelled"),
                ],
                default=1,
            ),
        ),
    ]