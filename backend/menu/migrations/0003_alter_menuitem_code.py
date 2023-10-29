# Generated by Django 4.2.4 on 2023-10-28 11:23

from django.db import migrations, models
import menu.models


class Migration(migrations.Migration):
    dependencies = [
        ("menu", "0002_menuitemtag_alter_menuitem_options_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="menuitem",
            name="code",
            field=models.CharField(
                default=menu.models.MenuHelper.generate_unique_product_code,
                max_length=5,
                unique=True,
            ),
        ),
    ]