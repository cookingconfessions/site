'use client';
import { useAppContext } from '@/context/AppContext';
import { OrderFormElements } from '@/types/form';
import {
	CreateCustomer,
	CreateOrder,
	OrdeDeliveryMode,
	OrderItem,
	OrderPaymentMethod,
} from '@/types/menu';
import { FormEvent } from 'react';
import BillingSection from './BillingSection';
import OrderSection from './OrderSection';

const CheckoutSection = () => {
	const {
		couponCode,
		customer,
		cart,
		handleCustomerRegistration,
		createOrder,
		shouldDeliverOrder,
		payCashOnDelivery,
	} = useAppContext();

	const getCustomerDetails = (elements: OrderFormElements): CreateCustomer => {
		return {
			firstName: elements.firstName.value,
			lastName: elements.lastName.value,
			email: elements.email.value,
			phoneNumber: elements.phoneNumber.value,
			country: elements.country.value,
			addressLine1: elements.addressLine1.value,
			addressLine2: elements.addressLine2.value,
		};
	};

	const getOrderItems = (): OrderItem[] => {
		return cart.map((item) => {
			return {
				item: item.id,
				quantity: item.quantity,
				total: item.total,
			};
		});
	};

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
			items: getOrderItems(),
		};

		createOrder(order);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const elements = (event.target as HTMLFormElement)
			.elements as OrderFormElements;

		if (!customer.id) {
			handleCustomerRegistration(getCustomerDetails(elements)).then((id) => {
				makeOrder(id, elements);
			});
		} else {
			makeOrder(customer.id, elements);
		}
	};

	return (
		<div className='page-area pb-85'>
			<div className='container'>
				<div className='row'>
					<div className='col-xl-12'>
						<div className='cafeu-page-content'>
							<div className='post-entry post-entry--top-margin'>
								<div className='checkout'>
									<form
										onSubmit={handleSubmit}
										className='checkout checkout-checkout'>
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

export default CheckoutSection;
