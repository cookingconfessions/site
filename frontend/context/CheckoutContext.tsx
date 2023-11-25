'use client';
import { CheckoutContextData } from '@/types/context';
import { OrderFormElements } from '@/types/form';
import {
	CreateOrder,
	OrdeDeliveryMode,
	OrderPaymentMethod,
	StripePaymentIntentResponse,
} from '@/types/menu';
import { useApiClient } from '@/utils/api-client';
import { CheckoutHelper } from '@/utils/checkout-helper';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import React, {
	FormEvent,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from './AppContext';

interface AppProviderProps {
	children: ReactNode;
}

const CheckoutContext = createContext<CheckoutContextData | undefined>(
	undefined
);

export const CheckoutProvider: React.FC<AppProviderProps> = ({ children }) => {
	const appContext = useAppContext();
	const {
		cartTotal,
		couponCode,
		deliveryFee,
		shouldDeliverOrder,
		loadDeliveryFee,
		handleCustomerRegistration,
		customer,
		createOrder,
		payCashOnDelivery,
		cart,
		updateOrderValidity,
	} = appContext;
	const [mainTotal, setMainTotal] = useState<number>(0);
	const [discount, setDiscount] = useState<number>(0);
	const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(
		new Promise<null>(() => null)
	);
	const [clientSecret, setClientSecret] = useState<string>('');
	const [isLoadingClientSecret, setIsLoadingClientSecret] = useState<boolean>(
		true
	);
	const [isPaymentSectionValid, setIsPaymentSectionValid] = useState<boolean>(
		false
	);
	const [areBillingDetailsValid, setAreBillingDetailsValid] = useState<boolean>(
		false
	);

	const makeOrder = (customerId: string, elements: OrderFormElements) => {
		const order: CreateOrder = {
			customer: customerId,
			orderNotes:
				elements.orderNotes.value === '' ? '-' : elements.orderNotes.value,
			discountCode: couponCode?.code ?? '',
			deliveryMode: shouldDeliverOrder
				? OrdeDeliveryMode.DELIVERY
				: OrdeDeliveryMode.PICKUP,
			paymentMethod: payCashOnDelivery
				? OrderPaymentMethod.CashOnDelivery
				: OrderPaymentMethod.CreditCard,
			items: CheckoutHelper.getOrderItems(cart),
		};

		createOrder(order);
	};

	const updatePaymentSectionValidity = (isValid: boolean) => {
		setIsPaymentSectionValid(isValid);
	};

	const handleOrderFormChange = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = document.getElementById('order_form') as HTMLFormElement;

		setAreBillingDetailsValid(form.checkValidity());
	};

	const handleOrderSubmit = (
		event: FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();

		const elements = (event.target as HTMLFormElement)
			.elements as OrderFormElements;

		if (!customer.id) {
			handleCustomerRegistration(
				CheckoutHelper.getCustomerDetails(elements)
			).then((id) => {
				makeOrder(id, elements);
			});
		} else {
			makeOrder(customer.id, elements);
		}

		return Promise.resolve();
	};

	const clearPaymentIntent = () => {
		setMainTotal(0);
		setClientSecret('');
		setIsLoadingClientSecret(true);
	};

	useEffect(() => {
		let isOrderValid = areBillingDetailsValid;

		if (!payCashOnDelivery) {
			isOrderValid = isOrderValid && isPaymentSectionValid;
		}

		updateOrderValidity(isOrderValid);
	}, [areBillingDetailsValid, isPaymentSectionValid]);

	useEffect(() => {
		let total = cartTotal;

		if (shouldDeliverOrder) {
			total += deliveryFee;
		}

		if (couponCode?.isActive) {
			setDiscount(total * (couponCode.discountPercentage / 100));
			total = total * (1 - couponCode.discountPercentage / 100);
		}

		setMainTotal(total);
	}, [cartTotal, couponCode, deliveryFee, shouldDeliverOrder]);

	useEffect(() => {
		loadDeliveryFee();

		if (payCashOnDelivery) {
			return;
		}

		const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

		if (!publishableKey) {
			return;
		}

		const stripePromise = loadStripe(publishableKey);
		setStripePromise(stripePromise);
	}, [payCashOnDelivery]);

	useEffect(() => {
		if (!cart.length) {
			return;
		}

		if (mainTotal === 0) {
			return;
		}

		const checkoutSession = JSON.parse(
			localStorage.getItem('checkoutSession') ?? '{}'
		) as StripePaymentIntentResponse;

		if (checkoutSession?.amount === mainTotal) {
			return setClientSecret(checkoutSession.clientSecret);
		}

		useApiClient()
			.createPaymentIntent(mainTotal)
			.then((res) => {
				setClientSecret(res.clientSecret);
				setIsLoadingClientSecret(false);
				localStorage.removeItem('checkoutSession');
				localStorage.setItem('checkoutSession', JSON.stringify(res));
			})
			.catch((_err) => {
				setClientSecret('');
				setIsLoadingClientSecret(false);
				toast.error('Error while creating payment intent');
			});
	}, [mainTotal, shouldDeliverOrder]);

	const contextValue: CheckoutContextData = {
		...appContext,
		mainTotal,
		discount,
		handleOrderSubmit,
		handleOrderFormChange,
		stripePromise,
		clientSecret,
		isLoadingClientSecret,
		clearPaymentIntent,
		updatePaymentSectionValidity,
	};

	return (
		<CheckoutContext.Provider value={contextValue}>
			{children}
		</CheckoutContext.Provider>
	);
};

export const useCheckoutContext = () => {
	const context = useContext(CheckoutContext);
	if (!context) {
		throw new Error(
			'useCheckoutContext must be used within an CheckoutProvider'
		);
	}
	return context;
};
