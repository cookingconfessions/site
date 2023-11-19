import { OrderFormElements } from "@/types/form";
import { CartItem, CreateCustomer, OrderItem } from "@/types/menu";

export class CheckoutHelper {
    static getCustomerDetails(elements: OrderFormElements): CreateCustomer {
        return {
            firstName: elements.firstName.value,
            lastName: elements.lastName.value,
            email: elements.email.value,
            phoneNumber: elements.phoneNumber.value,
            country: elements.country.value,
            addressLine1: elements.addressLine1.value,
            addressLine2: elements.addressLine2.value,
        };
    };

    static getOrderItems(cartItems: CartItem[]): OrderItem[] {
        return cartItems.map((item) => {
            return {
                item: item.id,
                quantity: item.quantity,
                total: item.total,
            };
        });
    };
};