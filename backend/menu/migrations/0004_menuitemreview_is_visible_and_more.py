# Generated by Django 4.2.4 on 2023-11-01 11:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("menu", "0003_alter_menuitem_code"),
    ]

    operations = [
        migrations.AddField(
            model_name="menuitemreview",
            name="is_visible",
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name="menuitemreview",
            name="menu_item",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reviews",
                to="menu.menuitem",
            ),
        ),
    ]
