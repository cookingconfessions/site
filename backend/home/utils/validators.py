from django.core.exceptions import ValidationError


def validate_closing_time_gt_opening_time(opens_at, closes_at):
    if closes_at <= opens_at:
        raise ValidationError("Closing time must be greater than opening time.")
