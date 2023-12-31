import logging

from common.utils.config import Config
from home.models import CompanyInfo
from pysendpulse.pysendpulse import PySendPulse


logger = logging.getLogger(__name__)

TOKEN_STORAGE = "memcached"


def send_new_order_sms(order):
    send_pulse = PySendPulse(
        Config.get("SENDPULSE_API_ID"),
        Config.get("SENDPULSE_API_SECRET"),
        TOKEN_STORAGE,
        memcached_host=Config.get("MEMCACHED_HOST"),
    )

    try:
        company_phone_number = CompanyInfo.objects.all().first().phone_numbers.split(",")[0]

        message = f"New order received from {order.customer_name()} contact {order.phone_number()}.\n\nHappy cooking!"

        res = send_pulse.sms_add_campaign_by_phones("Confessions", [company_phone_number], message)

        try:
            if res["data"]["is_error"]:
                logger.error(f"SMS failed to send for {order}")
        except KeyError:
            logger.info(f"SMS sent for {order}")
    except Exception as e:
        logger.error(f"An error occured while sending a notification for {order}: {str(e)}")
        return


def send_order_ready_sms(order):
    send_pulse = PySendPulse(
        Config.get("SENDPULSE_API_ID"),
        Config.get("SENDPULSE_API_SECRET"),
        TOKEN_STORAGE,
        memcached_host=Config.get("MEMCACHED_HOST"),
    )

    try:
        message = f"Hello {order.customer_short_name()},\n\nYour order from Cooking Confessions is ready for {'delivery' if order.delivery_mode == 1 else 'pickup'}.\n\nSee you soon!"

        res = send_pulse.sms_add_campaign_by_phones("Confessions", [order.phone_number()], message)

        try:
            if res["data"]["is_error"]:
                logger.error(f"SMS failed to send for {order}")
        except KeyError:
            logger.info(f"SMS sent for {order}")
    except Exception as e:
        logger.error(f"An error occured while sending a notification for {order}: {str(e)}")
        return


def send_new_booking_sms(booking):
    send_pulse = PySendPulse(
        Config.get("SENDPULSE_API_ID"),
        Config.get("SENDPULSE_API_SECRET"),
        TOKEN_STORAGE,
        memcached_host=Config.get("MEMCACHED_HOST"),
    )

    try:
        message = f"New booking received from {booking.name} contact {booking.phone_number}."
        company_phone_number = CompanyInfo.objects.all().first().phone_numbers.split(",")[0]

        res = send_pulse.sms_add_campaign_by_phones("Confessions", [company_phone_number], message)

        try:
            if res["data"]["is_error"]:
                logger.error(f"SMS failed to send for {booking}")
        except KeyError:
            logger.info(f"SMS sent for {booking}")
    except Exception as e:
        logger.error(f"An error occured while sending a notification for {booking}: {str(e)}")
        return


def send_new_message_sms(messageInfo):
    send_pulse = PySendPulse(
        Config.get("SENDPULSE_API_ID"),
        Config.get("SENDPULSE_API_SECRET"),
        TOKEN_STORAGE,
        memcached_host=Config.get("MEMCACHED_HOST"),
    )

    try:
        message = (
            f"New message received from {messageInfo.name} contact {messageInfo.phone_number}."
        )
        company_phone_number = CompanyInfo.objects.all().first().phone_numbers.split(",")[0]

        res = send_pulse.sms_add_campaign_by_phones("Confessions", [company_phone_number], message)

        try:
            if res["data"]["is_error"]:
                logger.error(f"SMS failed to send for {messageInfo}")
        except KeyError:
            logger.info(f"SMS sent for {messageInfo}")
    except Exception as e:
        logger.error(f"An error occured while sending a notification for {messageInfo}: {str(e)}")
        return
