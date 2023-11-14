import {
	BannerItem,
	Booking,
	CompanyInfo,
	Faq,
	Message,
	Schedule,
} from '@/types/home';
import { MenuItem, MenuItemCategory } from '@/types/menu';
import { useApiClient } from '@/utils/api-client';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface HomeContextData {
	activeMenuTab: string;
	handleMenuTabChange: (tab: any) => void;
	filteredItemList: MenuItem[];
	currentYear: number;
	activeMenuProductTab: string;
	handleMenuProductTabChange: (tab: any) => void;
	filteredMenuProductList: MenuItem[];
	openAccordion: string | null;
	handleAccordionBtn: (itemId: string) => void;
	isLightBoxModalOpen: boolean;
	openLightBoxModal: (product: MenuItem | null) => void;
	closeLightBoxModal: () => void;
	product: MenuItem | null;
	menuItemsToShow: number;
	handleMenuShowMore: () => void;
	handleMenuShowLess: () => void;
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
	bannerItems: BannerItem[];
	menuItems: MenuItem[];
	categories: MenuItemCategory[];
	schedules: Schedule[];
	companyInfo: CompanyInfo;
	faqs: Faq[];
}

const {
	getMenuItems,
	getBannerItems,
	getMenuItemCategories,
	getSchedule,
	getCompanyInfo,
	getFaqs,
	bookCatering,
	sendMessage,
} = useApiClient();
const menuItems: MenuItem[] = [];
const bannerItems: BannerItem[] = [];
const categories: MenuItemCategory[] = [];
const schedules: Schedule[] = [];
const faqs: Faq[] = [];
const companyInfo: CompanyInfo = {
	name: '',
	description: '',
	addressLine1: '',
	addressLine2: '',
	email: '',
	phoneNumbers: '',
	facebookLink: '',
	instagramLink: '',
	tiktokLink: '',
	countries: [],
};

getMenuItems().then((data) => menuItems.push(...data));
getBannerItems().then((data) => bannerItems.push(...data));
getMenuItemCategories().then((data) => categories.push(...data));
getSchedule().then((data) => schedules.push(...data));
getFaqs().then((data) => faqs.push(...data));
getCompanyInfo().then((data) => {
	companyInfo.name = data.name;
	companyInfo.description = data.description;
	companyInfo.addressLine1 = data.addressLine1;
	companyInfo.addressLine2 = data.addressLine2;
	companyInfo.email = data.email;
	companyInfo.phoneNumbers = data.phoneNumbers;
	companyInfo.facebookLink = data.facebookLink;
	companyInfo.tiktokLink = data.tiktokLink;
	companyInfo.countries = data.countries;
});

export const useHomeContext = (): HomeContextData => {
	const currentYear = new Date().getFullYear();

	// Menu Section filter
	const [activeMenuTab, setActiveMenuTab] = useState<string>('all');

	const handleMenuTabChange = (tab: any) => {
		setActiveMenuTab(tab);
	};
	const filteredItemList =
		activeMenuTab === 'all'
			? menuItems.slice(0, 7)
			: menuItems
					.slice(0, 7)
					.filter(
						(item) => item.category && item.category.includes(activeMenuTab)
					);

	// Mobile Sidebar
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const openSidebar = () => {
		setIsSidebarOpen(true);
	};
	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	// Menu Product Filter
	const [activeMenuProductTab, setActiveMenuProductTab] = useState<string>(
		'all'
	);
	const handleMenuProductTabChange = (tab: any) => {
		setActiveMenuProductTab(tab);
	};

	// LightBox Modal function
	const [isLightBoxModalOpen, setIsLightBoxModalOpen] = useState<boolean>(
		false
	);
	const [product, setProduct] = useState<MenuItem | null>(null);

	const openLightBoxModal = (product: MenuItem | null) => {
		setIsLightBoxModalOpen(true);
		setProduct(product);
	};
	const closeLightBoxModal = () => {
		setIsLightBoxModalOpen(false);
	};

	// Menu Products Section
	const filteredMenuProductList =
		activeMenuProductTab === 'all'
			? menuItems.slice(0, 19)
			: menuItems
					.slice(0, 19)
					.filter(
						(item) => item.category.toLowerCase() === activeMenuProductTab
					);
	const initialMenuItemsToShow = 8; // Number of items to initially show
	const [menuItemsToShow, setMenuItemsToShow] = useState<number>(
		initialMenuItemsToShow
	);

	const handleMenuShowMore = () => {
		setMenuItemsToShow(filteredMenuProductList.length);
	};
	const handleMenuShowLess = () => {
		setMenuItemsToShow(initialMenuItemsToShow);
	};

	// FAQ accordion
	const [openAccordion, setOpenAccordion] = useState<string | null>(null);

	const handleAccordionBtn = (itemId: string) => {
		setOpenAccordion((prevState) => (prevState === itemId ? null : itemId));
	};

	// Contact us
	const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

	const openContactModal = () => {
		setIsContactModalOpen(true);
	};
	const closeContactModal = () => {
		setIsContactModalOpen(false);
	};
	const handleContactFormSubmit = (message: Message) => {
		sendMessage(message).then((_) => {
			closeContactModal();
			toast.success(
				'Thank you for your message, we will get back to you shortly!'
			);
		});
	};

	// Booking
	const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

	const openBookingModal = () => {
		setIsBookingModalOpen(true);
	};
	const closeBookingModal = () => {
		setIsBookingModalOpen(false);
	};
	const handleBookingFormSubmit = (booking: Booking) => {
		bookCatering(booking).then((_) => {
			closeBookingModal();
			toast.success(
				'We received your booking, we will get back to you shortly!'
			);
		});
	};

	return {
		activeMenuTab,
		handleMenuTabChange,
		filteredItemList,
		currentYear,
		activeMenuProductTab,
		handleMenuProductTabChange,
		filteredMenuProductList,
		openAccordion,
		handleAccordionBtn,
		isLightBoxModalOpen,
		openLightBoxModal,
		closeLightBoxModal,
		product,
		menuItemsToShow,
		handleMenuShowMore,
		handleMenuShowLess,
		isSidebarOpen,
		openSidebar,
		closeSidebar,
		isContactModalOpen,
		openContactModal,
		closeContactModal,
		handleContactFormSubmit,
		isBookingModalOpen,
		openBookingModal,
		closeBookingModal,
		handleBookingFormSubmit,
		bannerItems,
		menuItems,
		categories,
		schedules,
		companyInfo,
		faqs,
	};
};
