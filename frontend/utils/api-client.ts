import { LoginDetails, ResetPasswordConfirmation, Token } from "@/types/auth";
import { BannerItem, Booking, CompanyInfo, Faq, Message, Schedule } from "@/types/home";
import { CouponCode, CreateCustomer, CreateMenuItemReview, CreateOrder, Customer, MenuItem, MenuItemCategory, MenuItemReview, Order, OrderPayment, ShopStatus, StripePaymentIntentResponse } from "@/types/menu";
import axios from "axios";
import humps from 'humps';

interface ApiClient {
    login: (user: LoginDetails) => Promise<Token>
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    resetPasswordConfirm: (details: ResetPasswordConfirmation) => Promise<void>;
    getMenuItems: () => Promise<MenuItem[]>;
    getMenuItem: (slug: string) => Promise<MenuItem>;
    getMenuItemCategories: () => Promise<MenuItemCategory[]>;
    getBannerItems: () => Promise<BannerItem[]>;
    getCompanyInfo: () => Promise<CompanyInfo>;
    getSchedule: () => Promise<Schedule[]>;
    getFaqs: () => Promise<Faq[]>;
    sendMessage: (message: Message) => Promise<Message[]>;
    bookCatering: (booking: Booking) => Promise<Booking[]>;
    getSimilarProducts: (itemId: string) => Promise<MenuItem[]>;
    validateCouponCode: (couponCode: string) => Promise<CouponCode>;
    createCustomer: (customer: CreateCustomer) => Promise<Customer>;
    getCustomer: () => Promise<Customer>;
    createOrder: (customer: CreateOrder) => Promise<Order>;
    createPaymentIntent: (orderTotal: number) => Promise<StripePaymentIntentResponse>;
    recordPayment: (order: OrderPayment) => Promise<OrderPayment>;
    submitReview: (menuItemSlug: string, review: CreateMenuItemReview) => Promise<MenuItemReview>;
    getShopStatus: () => Promise<ShopStatus>;
}

const PROTECTED_ENDPOINTS = ['/auth/profile/', '/auth/logout/'];

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT ?? '5000'),
    headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer your-token',
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token && (PROTECTED_ENDPOINTS.includes(config.url!))) {
        let accessToken = (JSON.parse(token) as Token).access;
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (config.data) {
        const modifiedData = JSON.stringify(humps.decamelizeKeys(config.data));
        config.data = modifiedData;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        response.data = humps.camelizeKeys(response.data)
        return response;
    },

    async (error) => {
        if (error.response) {
            console.error('Response error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Request setup error:', error.message);
        }

        return Promise.reject(error)
    }
);


const getMenuItems = async () => {
    const res = await api.get<MenuItem[]>("/menus/items/");
    return res.data;
}

const getMenuItem = async (slug: string) => {
    const res = await api.get<MenuItem>(`/menus/items/${slug}/`);
    return res.data;
}

const createPaymentIntent = async (orderTotal: number) => {
    const res = await api.post<StripePaymentIntentResponse>(`/shop/checkout/`, {
        total: orderTotal
    });
    return res.data;
}

const getMenuItemCategories = async () => {
    const res = await api.get<MenuItemCategory[]>("/menus/categories/");
    return res.data;
}

const getBannerItems = async () => {
    const res = await api.get<BannerItem[]>("/home/banner-items/");
    return res.data;
}

const getCompanyInfo = async () => {
    const res = await api.get<CompanyInfo>("/home/info/");
    return res.data;
}

const getSchedule = async () => {
    const res = await api.get<Schedule[]>("/home/schedule/");
    return res.data;
}

const getFaqs = async () => {
    const res = await api.get<Faq[]>("/home/faqs/");
    return res.data;
}

const sendMessage = async (message: Message) => {
    const res = await api.post<Message[]>("/home/contact/", message);
    return res.data;
}

const submitReview = async (menuItemSlug: string, review: CreateMenuItemReview) => {
    const res = await api.post<MenuItemReview>(`/menus/items/${menuItemSlug}/add_review/`, review);
    return res.data;
}

const bookCatering = async (booking: Booking) => {
    const res = await api.post<Booking[]>("/home/bookings/", booking);
    return res.data;
}

const getSimilarProducts = async (slug: string) => {
    const res = await api.get<MenuItem[]>(`/menus/items/${slug}/similar-menu-items/`);
    return res.data;
}

const validateCouponCode = async (couponCode: string) => {
    const res = await api.get<CouponCode>(`/shop/discountcodes/${couponCode}/`);
    return res.data;
}

const createCustomer = async (customer: CreateCustomer) => {
    const res = await api.post<Customer>("/shop/customers/", customer);
    return res.data;
}

const getCustomer = async () => {
    const res = await api.get<Customer>("/auth/profile/");
    return res.data;
}

const createOrder = async (order: CreateOrder) => {
    const res = await api.post<Order>("/shop/orders/", order);
    return res.data;
}

const recordPayment = async (order: OrderPayment) => {
    const res = await api.post<OrderPayment>("/shop/checkout/successful/", order);
    return res.data;
}

const getShopStatus = async () => {
    const res = await api.get<ShopStatus>("/shop/status/");
    return res.data;
}

const login = async (user: LoginDetails) => {
    const res = await api.post<Token>("/auth/token/", user);
    return res.data;
}

const logout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        Promise.reject('No token found');
    }

    let refreshToken = (JSON.parse(token!) as Token).refresh;

    const res = await api.post<void>("/auth/logout/", {
        refreshToken: refreshToken,
    });

    return res.data;
}

const resetPassword = async (email: string) => {
    const res = await api.post<void>("/auth/reset-password/", {
        email: email,
    });

    return res.data;
}

const resetPasswordConfirm = async (details: ResetPasswordConfirmation) => {
    const res = await api.post<void>("/auth/reset-password/confirm/", details);

    return res.data;
}

export const useApiClient = (): ApiClient => {
    return {
        login,
        logout,
        resetPassword,
        resetPasswordConfirm,
        getBannerItems,
        getMenuItems,
        getMenuItemCategories,
        getCompanyInfo,
        getSchedule,
        getFaqs,
        sendMessage,
        bookCatering,
        getSimilarProducts,
        validateCouponCode,
        createCustomer,
        getCustomer,
        getShopStatus,
        createOrder,
        createPaymentIntent,
        recordPayment,
        submitReview,
        getMenuItem
    }
}