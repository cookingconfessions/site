import { ShopContextData } from '@/types/context';
import {
	CartItem,
	CouponCode,
	CreateCustomer,
	CreateMenuItemReview,
	CreateOrder,
	Customer,
	MenuItem,
} from '@/types/menu';
import { useApiClient } from '@/utils/api-client';
import { ShopHelper } from '@/utils/shop-helper';
import Aos from 'aos';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useShopContext = (): ShopContextData => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [sortingOption, setSortingOption] = useState<string>('default');
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [cart, setCart] = useState<CartItem[]>([]);
	const itemsPerPage: number = 9;
	const cartItemAmount = cart.reduce((total, item) => total + item.quantity, 0);

	// Shop items
	const [shopItems, setShopItems] = useState<MenuItem[]>([]);
	const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
	const [filteredProducts, setFilteredProducts] = useState<MenuItem[]>(
		shopItems
	);

	const loadShopItems = () => {
		useApiClient()
			.getMenuItems()
			.then((data) => {
				const maximumPrice = ShopHelper.getMaximumPrice(data);

				setShopItems(data);
				setPriceRange([0, maximumPrice]);
			});
	};

	// Pagination
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
	() => setFilteredProducts(shopItems);
	const currentItems = filteredProducts.slice(startIndex, endIndex);

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	// Filter handlers
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
			setSelectedTags(
				selectedTags.filter((selectedTag) => selectedTag !== tag)
			);
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	// Function to add a product to the cart
	const addToCart = (productId: string) => {
		// Find the item from filteredProducts using productId
		const itemToAdd = shopItems.find((item) => item.id === productId);

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
				const updatedCart = [...cart, cartItem];
				localStorage.setItem('cart', JSON.stringify(updatedCart));

				toast.success('Item added in cart!');
			} else {
				const updatedCart = [...cart];
				updatedCart[existingItemIndex].quantity += 1;
				updatedCart[existingItemIndex].total =
					updatedCart[existingItemIndex].quantity * itemToAdd.price;

				setCart(updatedCart);

				// Update local storage with the updated cart
				localStorage.setItem('cart', JSON.stringify(updatedCart));

				toast.success('Item list updated in cart!');
			}
		} else {
			toast.warning('Item not found in filteredProducts.');
		}
	};

	const removeFromCart = (productId: string) => {
		const updatedCart = cart.filter((product) => product.id !== productId);

		setCart(updatedCart);

		const updatedProducts = filteredProducts.map((product) =>
			product.id === productId ? { ...product, isInCart: false } : product
		);
		setFilteredProducts(updatedProducts);

		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	const handleQuantityChange = (productId: string, newQuantity: number) => {
		if (newQuantity < 1) {
			return;
		} else {
			const updatedCart = cart.map((item) =>
				item.id === productId ? { ...item, quantity: newQuantity } : item
			);

			setCart(updatedCart);

			localStorage.setItem('cart', JSON.stringify(updatedCart));
		}
	};

	const addToCartWithQuantity = (productId: string, quantity: number) => {
		const itemToAdd = shopItems.find((item) => item.id === productId);

		if (itemToAdd) {
			const existingItemIndex = cart.findIndex((item) => item.id === productId);

			if (!cart.some((item) => item.id === productId)) {
				const newItem: CartItem = {
					...itemToAdd,
					isInCart: true,
					quantity: quantity,
					total: itemToAdd.price * quantity,
				};

				setCart((prevCart) => [...prevCart, newItem]);
				toast.success('Product added to cart!');
			} else if (existingItemIndex !== -1) {
				const updatedCart = [...cart];
				updatedCart[existingItemIndex].quantity += quantity;
				updatedCart[existingItemIndex].total =
					updatedCart[existingItemIndex].quantity * itemToAdd.price;

				setCart(updatedCart);
				toast.success('Product quantity updated in cart!');
			}
		} else {
			toast.warning('Product not found.');
		}
	};

	// Coupon Section
	const [couponCode, setCouponCode] = useState<CouponCode | undefined>();

	const applyCoupon = (code: string) => {
		useApiClient()
			.validateCouponCode(code)
			.then((coupon) => {
				if (!coupon.isActive) {
					toast.error('Coupon code is already expired :(');

					return;
				}

				setCouponCode(coupon);
				localStorage.setItem('coupon', JSON.stringify(coupon));
				toast.success('Coupon code applied!');
			})
			.catch((_error) => {
				toast.error('This coupon code is not valid!');
			});
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

	// Sticky Header Section on Scroll
	const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);

	// Order Section
	const [persistUserDetails, setPersistUserDetails] = useState<boolean>(true);
	const [canSubmitOrder, setCanSubmitOrder] = useState<boolean>(false);
	const [customer, setCustomer] = useState<Customer>({
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		country: '',
		addressLine1: '',
		addressLine2: '',
	});

	const updateOrderValidity = (isValid: boolean) => {
		setCanSubmitOrder(isValid);
	};

	const handlePersistUserDetails = () => {
		setPersistUserDetails(!persistUserDetails);
	};

	const handleCustomerRegistration = (
		customerDetails: CreateCustomer
	): Promise<string> => {
		return useApiClient()
			.createCustomer(customerDetails)
			.then((customerDetails) => {
				localStorage.setItem('customer', JSON.stringify(customer));
				setCustomer(customerDetails);

				return customerDetails.id;
			})
			.catch((_error) => {
				toast.error('An errror occured while saving your billing details :(');

				return '';
			});
	};

	const router = useRouter();

	const clearCustomer = () => {
		setCustomer({
			id: '',
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			country: '',
			addressLine1: '',
			addressLine2: '',
		});
	};

	const clearStateAfterOrder = () => {
		setCart([]);
		localStorage.removeItem('cart');
		localStorage.removeItem('coupon');
		clearCustomer();
		setCouponCode(undefined);

		if (payCashOnDelivery) {
			router.replace('/');
		}
	};

	const createOrder = (order: CreateOrder) => {
		useApiClient()
			.createOrder(order)
			.then((_order) => {
				toast.success('Order placed successfully!');
			})
			.catch((_error) => {
				toast.error('An error occured while placing your order :(');
			});
	};

	// Reviews
	const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
	const [reviewAdded, setReviewAdded] = useState(false);

	const handleOpenReviewModal = () => {
		setIsReviewModalOpen(!isReviewModalOpen);
	};

	const submitReview = (menuItemSlug: string, review: CreateMenuItemReview) => {
		useApiClient()
			.submitReview(menuItemSlug, review)
			.then((review) => {
				toast.success(`Thank you for your feedback ${review.name}!`);
				setReviewAdded(!reviewAdded);
			})
			.catch((_error) =>
				toast.error('There was a problem receiving your feedback :(')
			);
	};

	// Delivery
	const [deliveryFee, setDeliveryFee] = useState<number>(0.0);
	const [shouldDeliverOrder, setShouldDeliverOrder] = useState<boolean>(true);
	const handleShouldDeliverOrder = () => {
		setShouldDeliverOrder(!shouldDeliverOrder);
	};
	const loadDeliveryFee = () => {
		useApiClient()
			.getCompanyInfo()
			.then((info) => setDeliveryFee(info.deliveryFee));
	};

	// Payment
	const [payCashOnDelivery, setPayCashOnDelivery] = useState<boolean>(false);
	const handlePayCashOnDelivery = () => {
		setPayCashOnDelivery(!payCashOnDelivery);
	};

	// Filter products based on the selected options
	useEffect(() => {
		let sortedProducts = [...shopItems];

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
			sortedProducts = sortedProducts.filter(
				(item) => item.category === selectedCategory
			);
		}
		// Search filter
		if (searchQuery.trim() !== '') {
			sortedProducts = sortedProducts.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		// Apply tag filtering
		if (selectedTags.length > 0) {
			sortedProducts = sortedProducts.filter((item) =>
				selectedTags.includes(item.category)
			);
		}

		setFilteredProducts(sortedProducts);
		setCurrentPage(1);
	}, [
		shopItems,
		sortingOption,
		priceRange,
		selectedCategory,
		searchQuery,
		selectedTags,
	]);

	// Initialize shop items
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

		// Load cart from local storage
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		}

		// Load coupon from local storage
		const savedCoupon = localStorage.getItem('coupon');

		if (savedCoupon) {
			let coupon = JSON.parse(savedCoupon) as CouponCode;

			if (coupon.isActive) {
				setCouponCode(coupon);
			}
		}

		// Load customer from local storage
		const savedCustomer = localStorage.getItem('customer');

		if (savedCustomer) {
			setCustomer(JSON.parse(savedCustomer) as Customer);
		}

		return () => {
			// Clean up the event listener when the component is unmounted
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return {
		shopItems,
		loadShopItems,
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
		couponCode,
		applyCoupon,
		persistUserDetails,
		handlePersistUserDetails,
		customer,
		handleCustomerRegistration,
		canSubmitOrder,
		updateOrderValidity,
		createOrder,
		reviewAdded,
		submitReview,
		isReviewModalOpen,
		handleOpenReviewModal,
		deliveryFee,
		shouldDeliverOrder,
		handleShouldDeliverOrder,
		loadDeliveryFee,
		payCashOnDelivery,
		handlePayCashOnDelivery,
		clearStateAfterOrder,
	};
};
