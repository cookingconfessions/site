# Generated by Django 4.2.4 on 2023-11-25 09:52

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("shop", "0008_rename_orderpayments_orderpayment_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="orderpayment",
            old_name="payment_refference",
            new_name="payment_reference",
        ),
    ]
