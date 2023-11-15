
export interface Metadata {
    title: string;
    description: string;
}

export interface HeaderProp {
    logo: string;
    theme: string;
}

export interface LayoutProps {
    children: any;
}

export interface BannerItem {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
}

export interface CompanyInfo {
    name: string;
    description: string;
    addressLine1: string;
    addressLine2: string;
    email: string;
    phoneNumbers: string;
    facebookLink: string;
    instagramLink: string;
    tiktokLink: string;
    countries: string[];
    deliveryFee: number;
}

export interface Message {
    name: string;
    phoneNumber: string;
    email: string;
    location: string;
    message: string;
}

export interface Booking {
    name: string;
    email: string;
    phoneNumber: string;
    location: string;
    date: string;
    time: string;
    message: string;
}

export interface Schedule {
    day: string;
    opensAt: string;
    closesAt: string;
}

export interface Faq {
    id: string;
    question: string;
    answer: string;
}
