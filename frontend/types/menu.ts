export interface MenuProps {
    style: string;
    showMoreBtn: boolean;
}

export interface ProductCardProps {
    item: MenuItem;
}

export interface ProductProps {
    array: CartItem[];
    removeItem: (productId: string) => void;
    cartTable: boolean;
}

export interface CreateMenuItemReview {
    menuItem: string;
    name: string;
    email: string;
    message: string;
    parent?: string;
}

export interface MenuItemReview {
    id: string;
    name: string;
    email: string;
    message: string;
    parent: string;
    isVisible: boolean;
    createdAt: string;
    replies: MenuItemReview[];
}

export interface MenuItemTag {
    id: string;
    name: string;
}

export interface MenuItemAllergen {
    id: string;
    name: string;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    category: string;
    slug: string;
    price: number;
    image: string;
    isAvailable: boolean;
    code: string;
    tags: MenuItemTag[];
    allergens: MenuItemAllergen[];
    reviews: MenuItemReview[];
};

export interface CartItem extends MenuItem {
    isInCart: boolean; // New property
    quantity: number;
    total: number;
}

export interface MenuItemCategory {
    id: string,
    name: string;
    description: string;
    image: string;
}

export interface ShopDetailsProp {
    shopData: MenuItem;
}

export interface CouponCode {
    code: string;
    isActive: boolean;
    discountPercentage: number;
}

export interface CreateCustomer {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    country: string;
    addressLine1: string;
    addressLine2: string;
}

export interface Customer extends CreateCustomer {
    id: string;
    isNewCustomer?: boolean;
}

export interface OrderItem {
    item: string;
    quantity: number;
    total: number;
}

export enum OrdeDeliveryMode {
    DELIVERY = 1,
    PICKUP = 2
}

export enum OrderPaymentMethod {
    CreditCard = 1,
    CashOnDelivery = 2
}

export interface CreateOrder {
    customer: string;
    items: OrderItem[];
    orderNotes: string;
    discountCode: string;
    deliveryMode: OrdeDeliveryMode;
    paymentMethod: OrderPaymentMethod;
}

export interface Order {
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    phoneNumber: string;
    total: string;
    status: string;
    orderNotes: string;
    discountCode: string;
    deliveryMode: string;
    paymentMethod: string;
    items: OrderItem[];
}

export interface StripePaymentIntentResponse {
    clientSecret: string;
    paymentIntentId: string;
    amount: number;
}

export interface OrderPayment {
    paymentIntentId: string;
    orderId: string;
}

export interface ShopStatus {
    status: string;
    opensAt: string;
}
