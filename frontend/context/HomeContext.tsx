import { HomeContextData } from '@/types/context';
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
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useHomeContext = (): HomeContextData => {
	const currentYear = new Date().getFullYear();

	// Banner Section
	const [bannerItems, setBannerItems] = useState<BannerItem[]>([]);
	const loadBannerItems = () => {
		useApiClient()
			.getBannerItems()
			.then((data) => setBannerItems(data));
	};

	// Menu Products Section
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [activeMenuProductTab, setActiveMenuProductTab] = useState<string>(
		'all'
	);
	const [filteredMenuProductList, setFilteredMenuProductList] = useState<
		MenuItem[]
	>([]);

	const loadMenuItems = () => {
		useApiClient()
			.getMenuItems()
			.then((data) => setMenuItems(data));
	};
	const handleMenuProductTabChange = (tab: any) => {
		setActiveMenuProductTab(tab);
	};

	useEffect(() => {
		const filteredMenuProductList =
			activeMenuProductTab === 'all'
				? menuItems.slice(9)
				: menuItems
						.slice(0, 19)
						.filter(
							(item) => item.category.toLowerCase() === activeMenuProductTab
						);
		setFilteredMenuProductList(filteredMenuProductList);
	}, [activeMenuProductTab, menuItems]);

	// Categories section
	const [categories, setCategories] = useState<MenuItemCategory[]>([]);

	const loadCategories = () => {
		useApiClient()
			.getMenuItemCategories()
			.then((data) => setCategories(data));
	};

	// Schedule section
	const [schedules, setSchedules] = useState<Schedule[]>([]);

	const loadSchedules = () => {
		useApiClient()
			.getSchedule()
			.then((data) => setSchedules(data));
	};

	// Company Info
	const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
		name: '',
		description: '',
		addressLine1: '',
		addressLine2: '',
		email: '',
		phoneNumbers: '',
		facebookLink: '',
		instagramLink: '',
		tiktokLink: '',
		deliveryFee: 0.0,
		countries: [],
	});

	const loadCompanyInfo = () => {
		useApiClient()
			.getCompanyInfo()
			.then((data) => setCompanyInfo(data));
	};

	// Faqs
	const [faqs, setFaqs] = useState<Faq[]>([]);

	const loadFaqs = () => {
		useApiClient()
			.getFaqs()
			.then((data) => setFaqs(data));
	};

	// Mobile Sidebar
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const openSidebar = () => {
		setIsSidebarOpen(true);
	};
	const closeSidebar = () => {
		setIsSidebarOpen(false);
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
		useApiClient()
			.sendMessage(message)
			.then((_) => {
				closeContactModal();
				toast.success(
					'Thank you for your message, we will get back to you shortly!'
				);
			})
			.catch((_) =>
				toast.error(
					'There was a problem sending your message, please try again :('
				)
			);
	};

	// Booking
	const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
	const [bookingErrors, setBookingErrors] = useState<string[]>([]);

	const openBookingModal = () => {
		setIsBookingModalOpen(true);
	};
	const closeBookingModal = () => {
		setIsBookingModalOpen(false);
	};
	const handleBookingFormSubmit = (booking: Booking) => {
		useApiClient()
			.bookCatering(booking)
			.then((_) => {
				closeBookingModal();
				toast.success(
					'We received your booking, we will get back to you shortly!'
				);
			})
			.catch((error) => {
				if (error.response.data.date.length) {
					return setBookingErrors(error.response.data.date);
				}

				toast.error(
					'There was a problem adding your booking, please try again :('
				);
			});
	};

	const clearBookingErrors = () => {
		setBookingErrors([]);
	};

	return {
		currentYear,
		bannerItems,
		loadBannerItems,
		menuItems,
		loadMenuItems,
		filteredMenuProductList,
		activeMenuProductTab,
		handleMenuProductTabChange,
		categories,
		loadCategories,
		schedules,
		loadSchedules,
		companyInfo,
		loadCompanyInfo,
		faqs,
		loadFaqs,
		openAccordion,
		handleAccordionBtn,
		isLightBoxModalOpen,
		openLightBoxModal,
		closeLightBoxModal,
		product,
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
		bookingErrors,
		clearBookingErrors,
	};
};
