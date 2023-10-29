'use client';
import { productList } from '@/data/Data';
import { LoginDetails } from '@/types/auth';
import { Booking, Message } from '@/types/help';
import Aos from 'aos';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Define the interface for your context data
interface CafeuContextData {
	isHeaderFixed: boolean;
	isSearchbarModalOpen: boolean;
	openSearchbarModal: () => void;
	closeSearchbarModal: () => void;
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
	startIndex: number;
	endIndex: number;
	setSortingOption: (option: string) => void;
	sortingOption: string;
	filteredProducts: Product[];
	itemsPerPage: number;
	currentItems: Product[];
	currentPage: number;
	handlePageChange: (newPage: number) => void;
	totalPages: number;
	addToCart: (productId: number) => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedCategory: string;
	handleCategoryChange: (category: string) => void;
	priceRange: number[];
	setPriceRange: (newPriceRange: number[]) => void;
	handlePriceChange: (event: Event, newValue: number | number[]) => void;
	selectedTags: string[];
	handleTagChange: (tag: string) => void;
	cart: Product[];
	removeFromCart: (productId: number) => void;
	handleQuantityChange: (productId: number, newQuantity: number) => void;
	cartTotal: number;
	addToCartWithQuantity: (productId: number, quantity: number) => void;
	menuItemsToShow: number;
	handleMenuShowMore: () => void;
	handleMenuShowLess: () => void;
	isSidebarOpen: boolean;
	openSidebar: () => void;
	closeSidebar: () => void;
	handleDropdownToggle: (dropdownName: keyof DropdownState) => void;
	isDropdownOpen: DropdownState;
	cartItemAmount: number;
	haveCoupon: boolean;
	handleCouponBtn: () => void;
	passwordVisible: boolean;
	togglePasswordVisibility: () => void;
	isContactModalOpen: boolean;
	openContactModal: () => void;
	closeContactModal: () => void;
	handleContactFormSubmit: (message: Message) => void;
	isLoginModalOpen: boolean;
	openLoginModal: () => void;
	closeLoginModal: () => void;
	handleUserLogin: (loginDetails: LoginDetails) => void;
	isBookingModalOpen: boolean;
	openBookingModal: () => void;
	closeBookingModal: () => void;
	handleBookingFormSubmit: (booking: Booking) => void;
}

interface DropdownState {
	home: boolean;
	pages: boolean;
	blog: boolean;
}

export type Product = {
	id: number;
	imgSrc: string;
	name: string;
	priceRange: string;
	slug: string;
	sale?: boolean;
	category: string;
	isInCart: boolean; // New property
	isInWishlist: boolean; // New property
	price: number;
	quantity: number;
	total: number;
	foodType?: string[];
	status?: string;
	rating?: string;
	desc: string;
};
// Create the context with an initial value
const CafeuContext = createContext<CafeuContextData | undefined>(undefined);

interface CafeuProviderProps {
	children: ReactNode;
}

export const CafeuProvider: React.FC<CafeuProviderProps> = ({ children }) => {
	// Sticky Header Section on Scroll
	const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);

	// Searchbar Modal function
	const [isSearchbarModalOpen, setIsSearchbarModalOpen] = useState<boolean>(false);

	const openSearchbarModal = () => {
		setIsSearchbarModalOpen(true);
	};

	const closeSearchbarModal = () => {
		setIsSearchbarModalOpen(false);
	};

	// Current Year
	const currentYear = new Date().getFullYear();

	// Menu Product Filter
	const [activeMenuProductTab, setActiveMenuProductTab] = useState<string>('all');
	const handleMenuProductTabChange = (tab: any) => {
		setActiveMenuProductTab(tab);
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

	// Contact us
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

	// Log in
	const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
	const [loginDetails, setLoginDetails] = useState<LoginDetails | null>(null);

	const openLoginModal = () => {
		setIsLoginModalOpen(true);
	};
	const closeLoginModal = () => {
		setIsLoginModalOpen(false);
	};
	const handleUserLogin = (loginDetails: LoginDetails) => {
		setLoginDetails(loginDetails);
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

	//  All Logic for Shop Section
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [priceRange, setPriceRange] = useState<number[]>([0, 60]); // State for price range
	const [sortingOption, setSortingOption] = useState<string>('default');
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [cart, setCart] = useState<Product[]>([]);
	const itemsPerPage: number = 9;
	const cartItemAmount = cart.reduce((total, item) => total + item.quantity, 0);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(productList);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
	const currentItems = filteredProducts.slice(startIndex, endIndex);

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		window.scrollTo({
			top: 0,
			behavior: 'smooth', // Optional: Add smooth scrolling animation
		});
	};

	const handlePriceChange = (event: Event, newValue: number | number[]) => {
		setPriceRange(newValue as number[]);
	};
	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
	};
	const handleTagChange = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	// Function to add a product to the cart
	const addToCart = (productId: number) => {
		// Find the item from filteredProducts using productId
		const itemToAdd = productList.find((item) => item.id === productId);

		if (itemToAdd) {
			const existingItemIndex = cart.findIndex((item) => item.id === productId);

			if (existingItemIndex === -1) {
				setCart((prevCart) => [...prevCart, itemToAdd]);

				// Update local storage with the updated cart
				const updatedCart = [...cart, itemToAdd];
				localStorage.setItem('cart', JSON.stringify(updatedCart));

				toast.success('Item added in cart!');
			} else {
				const updatedCart = [...cart];
				updatedCart[existingItemIndex].quantity += 1;
				updatedCart[existingItemIndex].total = updatedCart[existingItemIndex].quantity * itemToAdd.price;

				setCart(updatedCart);

				// Update local storage with the updated cart
				localStorage.setItem('cart', JSON.stringify(updatedCart));

				toast.success('Item list updated in cart!');
			}
		} else {
			toast.warning('Item not found in filteredProducts.');
		}
	};

	// Function to remove a product from the cart
	const removeFromCart = (productId: number) => {
		// Create an updated cart by filtering out the product with the matching id
		const updatedCart = cart.filter((product) => product.id !== productId);

		// Update the cart state
		setCart(updatedCart);

		// Update the filteredProducts state to mark the product as not in the cart
		const updatedProducts = filteredProducts.map((product) =>
			product.id === productId ? { ...product, isInCart: false } : product
		);
		setFilteredProducts(updatedProducts);

		// Save the updated cart to local storage
		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	const handleQuantityChange = (productId: number, newQuantity: number) => {
		if (newQuantity < 1) {
			// Prevent quantity from going below 1
			return;
		} else {
			const updatedCart = cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item));

			setCart(updatedCart);

			// Update local storage with the updated cart
			localStorage.setItem('cart', JSON.stringify(updatedCart));
		}
	};

	const addToCartWithQuantity = (productId: number, quantity: number) => {
		const itemToAdd = productList.find((item) => item.id === productId);

		if (itemToAdd) {
			const existingItemIndex = cart.findIndex((item) => item.id === productId);

			if (!cart.some((item) => item.id === productId)) {
				const newItem = {
					...itemToAdd,
					quantity: quantity, // Set the provided quantity
					total: itemToAdd.price * quantity,
				};

				setCart((prevCart) => [...prevCart, newItem]);
				toast.success('Product added to cart!'); // Replace with your toast implementation
			} else if (existingItemIndex !== -1) {
				const updatedCart = [...cart];
				updatedCart[existingItemIndex].quantity += quantity; // Increment the quantity
				updatedCart[existingItemIndex].total = updatedCart[existingItemIndex].quantity * itemToAdd.price;

				setCart(updatedCart);
				toast.success('Product quantity updated in cart!'); // Replace with your toast implementation
			}
		} else {
			toast.warning('Product not found.'); // Replace with your toast implementation
		}
	};

	// Calculate the total price of items in the cart
	const calculateCartTotal = (cartItems: Product[]) => {
		let total = 0;

		for (const cartItem of cartItems) {
			total += cartItem.price * cartItem.quantity;
		}

		return total;
	};

	// Use the calculateCartTotal function to get the total price
	const cartTotal = calculateCartTotal(cart);

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

	const [isDropdownOpen, setIsDropdownOpen] = useState<DropdownState>({
		home: false,
		pages: false,
		blog: false,
	});

	// Define the function for handling dropdown toggle
	const handleDropdownToggle = (dropdownName: keyof DropdownState) => {
		setIsDropdownOpen((prevState) => ({
			...prevState,
			[dropdownName]: !prevState[dropdownName],
		}));
	};

	// Coupon Section
	const [haveCoupon, setHaveCoupon] = useState<boolean>(false);

	const handleCouponBtn = () => {
		setHaveCoupon(!haveCoupon);
	};

	// Password Visible
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// UseEffect

	useEffect(() => {
		// header sticky
		const handleScroll = () => {
			if (window.scrollY >= 200) {
				setIsHeaderFixed(true);
			} else {
				setIsHeaderFixed(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		// AOS Initialization
		Aos.init({
			duration: 500,
			once: true,
			easing: 'ease-in-out',
		});

		// Shop Section
		let sortedProducts = [...productList];

		if (sortingOption === 'lowToHigh') {
			sortedProducts.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
		} else if (sortingOption === 'highToLow') {
			sortedProducts.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
		} else if (sortingOption === 'sortAToZ') {
			sortedProducts.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
		} else if (sortingOption === 'sortZToA') {
			sortedProducts.sort((a, b) => (b.name ?? '').localeCompare(a.name ?? ''));
		}

		// Apply price range filtering
		sortedProducts = sortedProducts.filter((item) => {
			const itemPrice = item.price;

			if (typeof itemPrice === 'number' && !isNaN(itemPrice)) {
				const [minPrice, maxPrice] = priceRange;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			}

			return false;
		});

		// Apply category filtering
		if (selectedCategory !== 'All') {
			sortedProducts = sortedProducts.filter((item) => item.category === selectedCategory);
		}
		// Search filter
		if (searchQuery.trim() !== '') {
			sortedProducts = sortedProducts.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
		}
		// Apply tag filtering
		if (selectedTags.length > 0) {
			sortedProducts = sortedProducts.filter((item) => selectedTags.includes(item.category));
		}
		// Load cart from local storage
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		}

		setFilteredProducts(sortedProducts);
		setCurrentPage(1);
		return () => {
			// Clean up the event listener when the component is unmounted
			window.removeEventListener('scroll', handleScroll);
		};
	}, [sortingOption, priceRange, selectedCategory, searchQuery, selectedTags]);

	// Define the context value based on the interface
	const contextValue: CafeuContextData = {
		isHeaderFixed,
		isSearchbarModalOpen,
		openSearchbarModal,
		closeSearchbarModal,
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
		startIndex,
		endIndex,
		setSortingOption,
		sortingOption,
		filteredProducts,
		itemsPerPage,
		currentItems,
		currentPage,
		handlePageChange,
		totalPages,
		addToCart,
		searchQuery,
		setSearchQuery,
		selectedCategory,
		handleCategoryChange,
		priceRange,
		setPriceRange,
		handlePriceChange,
		selectedTags,
		handleTagChange,
		cart,
		removeFromCart,
		handleQuantityChange,
		cartTotal,
		addToCartWithQuantity,
		menuItemsToShow,
		handleMenuShowMore,
		handleMenuShowLess,
		isSidebarOpen,
		openSidebar,
		closeSidebar,
		handleDropdownToggle,
		isDropdownOpen,
		cartItemAmount,
		haveCoupon,
		handleCouponBtn,
		passwordVisible,
		togglePasswordVisibility,
		isContactModalOpen,
		openContactModal,
		closeContactModal,
		handleContactFormSubmit,
		isLoginModalOpen,
		openLoginModal,
		closeLoginModal,
		handleUserLogin,
		isBookingModalOpen,
		openBookingModal,
		closeBookingModal,
		handleBookingFormSubmit,
	};

	return <CafeuContext.Provider value={contextValue}>{children}</CafeuContext.Provider>;
};

export const useCafeuContext = () => {
	const context = useContext(CafeuContext);
	if (!context) {
		throw new Error('useCafeuContext must be used within an CafeuProvider');
	}
	return context;
};
