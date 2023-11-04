import { productList } from '@/data/Data';
import { Booking, Message } from '@/types/help';
import { Product } from '@/types/menu';
import { useState } from 'react';

export interface HomeContextData {
	activeMenuTab: string;
	handleMenuTabChange: (tab: any) => void;
	filteredItemList: Product[];
	currentYear: number;
	activeMenuProductTab: string;
	handleMenuProductTabChange: (tab: any) => void;
	filteredMenuProductList: Product[];
	openAccordion: number | null;
	handleAccordionBtn: (itemId: number) => void;
	isLightBoxModalOpen: boolean;
	openLightBoxModal: (product: Product | null) => void;
	closeLightBoxModal: () => void;
	product: Product | null;
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
}

export const useHomeContext = (): HomeContextData => {
	const currentYear = new Date().getFullYear();

	// Menu Section filter
	const [activeMenuTab, setActiveMenuTab] = useState<string>('all');

	const handleMenuTabChange = (tab: any) => {
		setActiveMenuTab(tab);
	};
	const filteredItemList =
		activeMenuTab === 'all'
			? productList.slice(1, 7)
			: productList.slice(1, 7).filter((item) => item.foodType && item.foodType.includes(activeMenuTab));

	// Mobile Sidebar
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const openSidebar = () => {
		setIsSidebarOpen(true);
	};
	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	// Menu Product Filter
	const [activeMenuProductTab, setActiveMenuProductTab] = useState<string>('all');
	const handleMenuProductTabChange = (tab: any) => {
		setActiveMenuProductTab(tab);
	};

	// LightBox Modal function
	const [isLightBoxModalOpen, setIsLightBoxModalOpen] = useState<boolean>(false);
	const [product, setProduct] = useState<Product | null>(null);

	const openLightBoxModal = (product: Product | null) => {
		setIsLightBoxModalOpen(true);
		setProduct(product);
	};
	const closeLightBoxModal = () => {
		setIsLightBoxModalOpen(false);
	};

	// Menu Products Section
	const filteredMenuProductList =
		activeMenuProductTab === 'all'
			? productList.slice(9, 19)
			: productList.slice(9, 17).filter((item) => item.foodType && item.foodType.includes(activeMenuProductTab));
	const initialMenuItemsToShow = 8; // Number of items to initially show
	const [menuItemsToShow, setMenuItemsToShow] = useState<number>(initialMenuItemsToShow);

	const handleMenuShowMore = () => {
		// When the "Show More" button is clicked, set itemsToShow to the total number of items in the list
		setMenuItemsToShow(filteredMenuProductList.length);
	};
	const handleMenuShowLess = () => {
		setMenuItemsToShow(initialMenuItemsToShow);
	};

	// FAQ accordion
	const [openAccordion, setOpenAccordion] = useState<number | null>(0);

	const handleAccordionBtn = (itemId: number) => {
		setOpenAccordion((prevState) => (prevState === itemId ? null : itemId));
	};

	// Contact us
	const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<Message | null>(null);

	const openContactModal = () => {
		setIsContactModalOpen(true);
	};
	const closeContactModal = () => {
		setIsContactModalOpen(false);
	};
	const handleContactFormSubmit = (message: Message) => {
		setMessage(message);
	};

	// Booking
	const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
	const [booking, setBooking] = useState<Booking | null>(null);

	const openBookingModal = () => {
		setIsBookingModalOpen(true);
	};
	const closeBookingModal = () => {
		setIsBookingModalOpen(false);
	};
	const handleBookingFormSubmit = (booking: Booking) => {
		setBooking(booking);
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
	};
};
