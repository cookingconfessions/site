import { BannerItem, Booking, CompanyInfo, Faq, Message, Schedule } from "@/types/home";
import { CouponCode, CreateCustomer, CreateOrder, Customer, MenuItem, MenuItemCategory, Order } from "@/types/menu";
import axios from "axios";
import humps from 'humps';

interface ApiClient {
    getMenuItems: () => Promise<MenuItem[]>;
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
    createOrder: (customer: CreateOrder) => Promise<Order>
}

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer your-token',
    }
});


api.interceptors.request.use((config) => {
    if (config.data) {
        const modifiedData = JSON.stringify(humps.decamelizeKeys(config.data));
        config.data = modifiedData;
        console.log('modifiedData', modifiedData)
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        response.data = humps.camelizeKeys(response.data)
        return response;
    },
    (error) => {
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
    // console.log('items resp', res.data)

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

const bookCatering = async (booking: Booking) => {
    const res = await api.post<Booking[]>("/home/bookings/", booking);
    return res.data;
}

const getSimilarProducts = async (itemId: string) => {
    const res = await api.get<MenuItem[]>(`/menus/items/${itemId}/similar-menu-items/`);
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

const createOrder = async (order: CreateOrder) => {
    const res = await api.post<Order>("/shop/orders/", order);
    return res.data;
}

export const useApiClient = (): ApiClient => {
    return {
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
        createOrder
    }
}