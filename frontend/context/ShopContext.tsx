import { CartItem, MenuItem } from '@/types/menu';
import { useApiClient } from '@/utils/api-client';
import { ShopHelper } from '@/utils/shop-helper';
import Aos from 'aos';
import { SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface ShopContextData {
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
	cart: MenuItem[];
	removeFromCart: (productId: string) => void;
	handleQuantityChange: (productId: string, newQuantity: number) => void;
	cartTotal: number;
	addToCartWithQuantity: (productId: string, quantity: number) => void;
	cartItemAmount: number;
	haveCoupon: boolean;
	handleCouponBtn: () => void;
}

const menuItems: MenuItem[] = [];

useApiClient()
	.getMenuItems()
	.then((items) => menuItems.push(...items));

export const useShopContext = (): ShopContextData => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [sortingOption, setSortingOption] = useState<string>('default');
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [cart, setCart] = useState<CartItem[]>([]);
	const itemsPerPage: number = 9;
	const cartItemAmount = cart.reduce((total, item) => total + item.quantity, 0);
	const maximumPrice = ShopHelper.getMaximumPrice(menuItems);
	const [priceRange, setPriceRange] = useState<number[]>([0, maximumPrice]); // State for price range
	const [filteredProducts, setFilteredProducts] = useState<MenuItem[]>(menuItems);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
	() => setFilteredProducts(menuItems);
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
	const addToCart = (productId: string) => {
		// Find the item from filteredProducts using productId
		const itemToAdd = menuItems.find((item) => item.id === productId);

		if (itemToAdd) {
			const existingItemIndex = cart.findIndex((item) => item.id === productId);
			const cartItem: CartItem = {
				...itemToAdd,
				quantity: 1,
				total: 1 * itemToAdd.price,
				isInCart: true,
			};

			if (existingItemIndex === -1) {
				setCart((prevCart) => [...prevCart, cartItem]);

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
	const removeFromCart = (productId: string) => {
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

	const handleQuantityChange = (productId: string, newQuantity: number) => {
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

	const addToCartWithQuantity = (productId: string, quantity: number) => {
		const itemToAdd = menuItems.find((item) => item.id === productId);

		if (itemToAdd) {
			const existingItemIndex = cart.findIndex((item) => item.id === productId);

			if (!cart.some((item) => item.id === productId)) {
				const newItem: CartItem = {
					...itemToAdd,
					isInCart: true,
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
	const calculateCartTotal = (cartItems: CartItem[]) => {
		let total = 0;

		for (const cartItem of cartItems) {
			total += cartItem.price * cartItem.quantity;
		}

		return total;
	};

	// Use the calculateCartTotal function to get the total price
	const cartTotal = calculateCartTotal(cart);

	// Coupon Section
	const [haveCoupon, setHaveCoupon] = useState<boolean>(false);

	const handleCouponBtn = () => {
		setHaveCoupon(!haveCoupon);
	};

	// Sticky Header Section on Scroll
	const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);

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
		let sortedProducts = [...menuItems];

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

	return {
		isHeaderFixed,
		startIndex,
		endIndex,
		setSortingOption,
		sortingOption,
		filteredProducts,
		setFilteredProducts,
		itemsPerPage,
		currentItems,
		currentPage,
		setCurrentPage,
		handlePageChange,
		totalPages,
		setCart,
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
		cartItemAmount,
		haveCoupon,
		handleCouponBtn,
	};
};
