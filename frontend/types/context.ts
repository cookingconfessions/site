import { Stripe } from "@stripe/stripe-js";
import { FormEvent, SetStateAction } from "react";
import { LoginDetails } from "./auth";
import { BannerItem, Booking, CompanyInfo, Faq, Message, Schedule } from "./home";
import { CartItem, CouponCode, CreateCustomer, CreateMenuItemReview, CreateOrder, Customer, MenuItem, MenuItemCategory } from "./menu";

export interface HomeContextData {
    currentYear: number;
    bannerItems: BannerItem[];
    loadBannerItems: () => void;
    menuItems: MenuItem[];
    loadMenuItems: () => void;
    filteredMenuProductList: MenuItem[];
    activeMenuProductTab: string;
    handleMenuProductTabChange: (tab: any) => void;
    categories: MenuItemCategory[];
    loadCategories: () => void
    schedules: Schedule[];
    loadSchedules: () => void;
    companyInfo: CompanyInfo;
    loadCompanyInfo: () => void
    faqs: Faq[];
    loadFaqs: () => void;
    openAccordion: string | null;
    handleAccordionBtn: (itemId: string) => void;
    isLightBoxModalOpen: boolean;
    openLightBoxModal: (product: MenuItem | null) => void;
    closeLightBoxModal: () => void;
    product: MenuItem | null;
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    isContactModalOpen: boolean;
    openContactModal: () => void;
    closeContactModal: () => void;
    handleContactFormSubmit: (message: Message) => void;
    isBookingModalOpen: boolean;
    openBookingModal: () => void;
    closeBookingModal: () => void;
    handleBookingFormSubmit: (booking: Booking) => void;
    bookingErrors: string[];
    clearBookingErrors: () => void
}

export interface ShopContextData {
    shopItems: MenuItem[];
    loadShopItems: () => void;
    isHeaderFixed: boolean;
    startIndex: number;
    endIndex: number;
    setSortingOption: (option: string) => void;
    sortingOption: string;
    filteredProducts: MenuItem[];
    setFilteredProducts: (value: SetStateAction<MenuItem[]>) => void;
    itemsPerPage: number;
    currentItems: MenuItem[];
    currentPage: number;
    setCurrentPage: (value: SetStateAction<number>) => void;
    handlePageChange: (newPage: number) => void;
    totalPages: number;
    setCart: (value: SetStateAction<CartItem[]>) => void;
    addToCart: (productId: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    handleCategoryChange: (category: string) => void;
    priceRange: number[];
    setPriceRange: (newPriceRange: number[]) => void;
    handlePriceChange: (event: Event, newValue: number | number[]) => void;
    selectedTags: string[];
    handleTagChange: (tag: string) => void;
    cart: CartItem[];
    removeFromCart: (productId: string) => void;
    handleQuantityChange: (productId: string, newQuantity: number) => void;
    cartTotal: number;
    addToCartWithQuantity: (productId: string, quantity: number) => void;
    cartItemAmount: number;
    couponCode: CouponCode | undefined;
    applyCoupon: (code: string) => void;
    persistUserDetails: boolean;
    disableUserDetailsPersist: () => void;
    handlePersistUserDetails: () => void;
    customer: Customer;
    handleCustomerRegistration: (customer: CreateCustomer) => Promise<string>;
    canSubmitOrder: boolean;
    updateOrderValidity: (isValid: boolean) => void
    createOrder: (order: CreateOrder) => void;
    reviewAdded: boolean;
    submitReview: (menuItemSlug: string, review: CreateMenuItemReview) => void;
    isReviewModalOpen: boolean;
    handleOpenReviewModal: () => void;
    deliveryFee: number;
    shouldDeliverOrder: boolean;
    handleShouldDeliverOrder: () => void;
    payCashOnDelivery: boolean;
    handlePayCashOnDelivery: () => void;
    loadDeliveryFee: () => void;
    clearStateAfterOrder: () => void;
    isShopLoading: boolean;
}

export interface AuthContextData {
    user: Customer | undefined;
    isAuthenticated: boolean;
    passwordVisible: boolean;
    togglePasswordVisibility: () => void;
    isLoginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    handleUserLogin: (loginDetails: LoginDetails) => void;
    logout: () => void;
    sendPasswordResetEmail: (email: string) => void;
    resetPassword: (password: string, token: string) => void;
    passwordResetErrors: string[];
    clearPasswordResetErrors: () => void,
    passwordResetRequestSent: boolean;
    retryPasswordReset: () => void;
}

export interface AppContextData extends HomeContextData, AuthContextData, ShopContextData {
    isHeaderFixed: boolean;
}

export interface CheckoutContextData extends AppContextData {
    mainTotal: number;
    discount: number;
    handleOrderSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    handleOrderFormChange: (event: FormEvent<HTMLFormElement>) => void;
    clientSecret: string | undefined;
    stripePromise: Promise<Stripe | null>
    isLoadingClientSecret: boolean;
    updatePaymentSectionValidity: (isValid: boolean) => void;
    clearPaymentIntent: () => void;
}