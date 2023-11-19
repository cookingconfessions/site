'use client';
import Loading from '@/app/checkout/loading';
import { useCheckoutContext } from '@/context/CheckoutContext';
import { Elements } from '@stripe/react-stripe-js';
import OrderForm from './OrderForm';

const CheckoutSection = () => {
	const {
		stripePromise,
		clientSecret,
		isLoadingClientSecret,
	} = useCheckoutContext();

	return isLoadingClientSecret ? (
		<Loading />
	) : (
		<Elements stripe={stripePromise} options={{ clientSecret }}>
			<OrderForm />
		</Elements>
	);
};

export default CheckoutSection;
