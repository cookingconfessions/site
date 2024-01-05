'use client';
import { useCheckoutContext } from '@/context/CheckoutContext';
import { CheckoutHelper } from '@/utils/checkout-helper';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import OrderForm from './OrderForm';

const CheckoutSection = () => {
	const { stripePromise, mainTotal, cartTotal } = useCheckoutContext();

	const [stripePaymentOptions, setStripePaymentOptions] = useState<object>({
		mode: 'payment',
		amount: CheckoutHelper.convertToCents(1),
		currency: 'eur',
	});

	useEffect(() => {
		if (mainTotal === 0) return;

		setStripePaymentOptions({
			mode: 'payment',
			amount: CheckoutHelper.convertToCents(mainTotal),
			currency: 'eur',
		});
	}, [mainTotal]);

	return (
		<Elements stripe={stripePromise} options={stripePaymentOptions}>
			<OrderForm />
		</Elements>
	);
};

export default CheckoutSection;
