import random
import string


def generate_code(length=5):
    return "".join(random.choice(string.ascii_uppercase + string.digits) for _ in range(length))
