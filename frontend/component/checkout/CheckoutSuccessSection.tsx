'use client';
import { useCheckoutContext } from '@/context/CheckoutContext';
import { StripePaymentIntentResponse } from '@/types/menu';
import { useApiClient } from '@/utils/api-client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CheckoutSuccessSection: React.FC = () => {
	const {
		clearStateAfterOrder,
		clearPaymentIntent,
		payCashOnDelivery,
	} = useCheckoutContext();

	const [activationEmailSent, setActivationEmailSent] = useState<boolean>(
		false
	);

	useEffect(() => {
		const order = localStorage.getItem('order');

		if (!order) {
			return;
		}

		if (payCashOnDelivery) {
			clearPaymentIntent();
			clearStateAfterOrder();
			toast.success('Order placed successfully!');

			return;
		}

		const checkoutSession = JSON.parse(
			localStorage.getItem('checkoutSession') ?? '{}'
		) as StripePaymentIntentResponse;

		useApiClient()
			.recordPayment({
				orderId: JSON.parse(order).id,
				paymentIntentId: checkoutSession.paymentIntentId,
			})
			.then(() => {
				clearPaymentIntent();
				clearStateAfterOrder();
			})
			.catch(() => {
				clearPaymentIntent();
				clearStateAfterOrder();
				toast.error(
					'We received your payment but failed to record it. Please contact us.'
				);
			});
	}, []);

	useEffect(() => {
		const customerEmailToActivate = localStorage.getItem(
			'customerEmailToActivate'
		);

		if (!customerEmailToActivate) {
			return;
		}

		useApiClient()
			.resetPassword(customerEmailToActivate)
			.then(() => {
				setActivationEmailSent(true);
				localStorage.removeItem('customerEmailToActivate');
			})
			.catch(() => {
				toast.error(
					'There was a problem setting up your customer account. Please contact us.'
				);
				localStorage.removeItem('customerEmailToActivate');
			});
	}, []);

	return (
		<div className='container text-center'>
			<h4 className='sec-title'>Order received!</h4>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='100'
				height='100'
				fill='green'
				className='bi bi-bag-check'
				viewBox='0 0 16 16'>
				<path
					fillRule='evenodd'
					d='M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z'
				/>
				<path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z' />
			</svg>
			<p className='about-des pt-15'>
				Thank you for your order. We will let you know once it is ready for
				delivery!
			</p>
			{activationEmailSent && (
				<p className='about-des pt-15'>
					We have sent you an email with a link to activate your account for
					faster checkout next time.
				</p>
			)}
			<div className='row'>
				<div className='text-center  my-4'>
					<a className='custom-btn' role='button' href='/menu'>
						Back to Menu
					</a>
				</div>
			</div>
		</div>
	);
};

export default CheckoutSuccessSection;
