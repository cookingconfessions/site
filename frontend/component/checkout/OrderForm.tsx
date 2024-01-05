'use client';
import { useCheckoutContext } from '@/context/CheckoutContext';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BillingSection from './BillingSection';
import OrderSection from './OrderSection';

const OrderForm = () => {
	const {
		handleOrderSubmit,
		handleOrderFormChange,
		payCashOnDelivery,
		updatePaymentSectionValidity,
		createPaymentIntent,
	} = useCheckoutContext();

	const stripe = useStripe();
	const elements = useElements();
	const [paymentErrorMessage, setPaymentErrorMessage] = useState<string>();
	const [isPaymentProcessing, setIsPaymentProcessing] = useState<boolean>(
		false
	);

	const router = useRouter();

	const confirmOnlinePayment = async (clientSecret: string) => {
		if (!stripe || !elements || !clientSecret) {
			return;
		}

		setIsPaymentProcessing(true);

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${window.location.origin}/checkout-success`,
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setPaymentErrorMessage(error.message);
			toast.error(paymentErrorMessage);
		} else {
			setPaymentErrorMessage('An unexpected error occured.');
			toast.error(paymentErrorMessage);
		}

		setIsPaymentProcessing(false);
	};

	const completeOrder = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const pendingOrder = localStorage.getItem('order');

		if (payCashOnDelivery) {
			if (pendingOrder) {
				return router.push('/checkout-success');
			}

			return handleOrderSubmit(event).then(() => {
				router.push('/checkout-success');
			});
		}

		if (!stripe || !elements) {
			return;
		}

		const paymentValidationResults = await elements.submit();

		if (paymentValidationResults.error) {
			return;
		}

		if (!pendingOrder) {
			await handleOrderSubmit(event);
		}

		const clientSecret = await createPaymentIntent();

		await confirmOnlinePayment(clientSecret);
	};

	useEffect(() => {
		const isPaymentSectionValid =
			!isPaymentProcessing && !!stripe && !!elements;
		updatePaymentSectionValidity(isPaymentSectionValid);
	}, [isPaymentProcessing, stripe, elements]);

	return (
		<div className='page-area pb-85'>
			<div className='container'>
				<div className='row'>
					<div className='col-xl-12'>
						<div className='cafeu-page-content'>
							<div className='post-entry post-entry--top-margin'>
								<div className='checkout'>
									<form
										id='order_form'
										onSubmit={completeOrder}
										className='checkout checkout-checkout'
										onChange={handleOrderFormChange}>
										<div className='row' id='customer_details'>
											<BillingSection />
											<OrderSection />
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderForm;
