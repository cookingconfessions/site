import logging

from common.utils.config import Config
from home.models import CompanyInfo
from pysendpulse.pysendpulse import PySendPulse


logger = logging.getLogger(__name__)

TOKEN_STORAGE = "memcached"

SendPulseAPIProxy = PySendPulse(
    Config.get("SENDPULSE_API_ID"),
    Config.get("SENDPULSE_API_SECRET"),
    TOKEN_STORAGE,
    memcached_host=Config.get("MEMCACHED_HOST"),
)


def send_new_order_sms(order):
    try:
        company_phone_number = CompanyInfo.objects.all().first().phone_numbers.split(",")[0]

        delivery_details = (
            f"Deliver to {order.customer_address()}" if order.delivery_mode == 1 else "Self pickup."
        )
        payment_details = "Cash on delivery" if order.payment_method == 2 else "Paid online"
        order_notes = f",\nOrder notes: {order.order_notes}.\n" if order.order_notes else ".\n"
        message = f"New order received from {order.customer_name()} at {order.created_at.strftime('%I:%M %p')}:\n\nOrder items: {order.get_items()},\nPhone number: {order.phone_number()},\nPayment: {payment_details},\nDelivery: {delivery_details}{order_notes}\nPlease check the admin panel for more details,\nHappy cooking!"

        res = SendPulseAPIProxy.sms_add_campaign_by_phones(
            "Confessions", [company_phone_number], message
        )

        try:
            if res["data"]["is_error"]:
                logger.error(f"SMS failed to send for {order}")
        except KeyError:
            logger.info(f"SMS sent for {order}")
    except Exception as e:
        logger.error(f"An error occured while sending a notification for {order}: {str(e)}")
        return


def send_order_ready_sms(order):
    try:
        message = f"Hello {order.customer_name()},\n\nYour order from Cooking Confessions is ready for {'delivery' if order.delivery_mode == 1 else 'pickup'}.\n\nSee you soon!"

        res = SendPulseAPIProxy.sms_add_campaign_by_phones(
            "Confessions", [order.phone_number()], message
        )

        try:
            if res["data"]["is_error"]:
                logger.error(f"SMS failed to send for {order}")
        except KeyError:
            logger.info(f"SMS sent for {order}")
    except Exception as e:
        logger.error(f"An error occured while sending a notification for {order}: {str(e)}")
        return
