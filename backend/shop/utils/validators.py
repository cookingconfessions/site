from datetime import date, datetime, time

from django.core.exceptions import ValidationError


def validate_discount_code_not_already_expired(expiry_date: date, expiry_time: time):
    if date.today() < expiry_date:
        raise ValidationError("Discount code expiry date should be today or a later date")

    if expiry_date == date.today() and expiry_time <= datetime.now().time():
        raise ValidationError("Discount code expiry time should be a later time")
