from common.utils.config import Config
from home.models import CompanyInfo
from pysendpulse.pysendpulse import PySendPulse
from shop.models import Order


TOKEN_STORAGE = "memcached"
MEMCACHED_HOST = "127.0.0.1:11211"

SendPulseAPIProxy = PySendPulse(
    Config.get("SENDPULSE_API_ID"),
    Config.get("SENDPULSE_API_SECRET"),
    TOKEN_STORAGE,
    memcached_host=MEMCACHED_HOST,
)


def send_new_order_sms(order: Order):
    try:
        company_phone_number = CompanyInfo.objects.all().first().phone_numbers.split(",")[0]
        message = f"New order received from {order.customer_name()} at {order.customer_address()} phone number: {order.phone_number()}. Please check the admin panel for more details."

        res = SendPulseAPIProxy.sms_add_campaign_by_phones(
            "Confessions", [company_phone_number], message
        )

        try:
            if res["data"]["is_error"]:
                print(f"SMS failed to send for {order}")
        except KeyError:
            print(f"SMS sent for {order}")
    except Exception:
        print(f"An error occured while sending a notification for {order}")
        return