'use client';
import { useCheckoutContext } from '@/context/CheckoutContext';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const BillingSection = () => {
	const {
		companyInfo,
		persistUserDetails,
		handlePersistUserDetails,
		customer,
		shouldDeliverOrder,
		handleShouldDeliverOrder,
		payCashOnDelivery,
		handlePayCashOnDelivery,
	} = useCheckoutContext();

	const [email, setEmail] = useState<string>(customer.email);

	return (
		<div className='col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-lg-0 mb-50 mb-lg-0'>
			<div className='checkout-billing-fields'>
				<h4 className='cafeu-billing-details-title'>Billing details</h4>

				<div className='checkout-billing-fields__field-wrapper cafeu-submit-form-default cafeu-woo-form-billing-form-style-custom'>
					<p
						className='form-row form-row-first validate-required'
						id='billing_first_name_field'>
						<label htmlFor='billing_first_name' className=''>
							First name <span className='asterisk'>*</span>&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='text'
								className='input-text '
								name='firstName'
								defaultValue={customer.firstName}
								required
							/>
						</span>
					</p>
					<p
						className='form-row form-row-last validate-required'
						id='billing_last_name_field'>
						<label htmlFor='billing_last_name' className=''>
							Last name <span className='asterisk'>*</span>&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='text'
								className='input-text '
								name='lastName'
								defaultValue={customer.lastName}
								required
							/>
						</span>
					</p>
					<p className='form-row form-row-wide validate-required'>
						<label htmlFor='billing_phone' className=''>
							Phone number <span className='asterisk'>*</span>&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='tel'
								className='input-text '
								name='phoneNumber'
								defaultValue={customer.phoneNumber}
								required
							/>
						</span>
					</p>
					<p className='form-row form-row-wide address-field validate-required'>
						<span className='checkout-input-wrapper mt-5'>
							<label htmlFor='email'>
								Email <span className='asterisk'>*</span>&nbsp;
								<abbr className='required' title='required'></abbr>
							</label>
							<input
								type='email'
								className='input-text '
								name='email'
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
							/>
						</span>
					</p>
					<p
						className='form-row form-row-wide address-field update_totals_on_change validate-required'
						id='billing_country_field'>
						<label htmlFor='billing_country' className=''>
							Country <span className='asterisk'>*</span>&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<Form.Select
								name='country'
								defaultValue={customer.country}
								required
								className='country_to_state country_select select2-hidden-accessible'>
								<option value=''>Select a country / region…</option>
								{companyInfo.countries.map((country) => (
									<option
										selected={country === 'Slovakia'}
										key={country}
										value={country}>
										{country}
									</option>
								))}
							</Form.Select>
						</span>
					</p>
					<p
						className='form-row address-field validate-required'
						id='billing_address_1_field'>
						<label htmlFor='billing_address_1' className=''>
							Street address <span className='asterisk'>*</span>&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='text'
								className='input-text  '
								name='addressLine1'
								defaultValue={customer.addressLine1}
								required
								placeholder='House number and street name'
							/>
						</span>
					</p>
					<p className='form-row address-field validate-required'>
						<label htmlFor='billing_address_2'>
							Apartment, suite, unit, etc.&nbsp;
							<span className='optional'>(optional)</span>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='text'
								className='input-text  '
								name='addressLine2'
								defaultValue={customer.addressLine2}
								placeholder='Apartment, suite, unit, etc. (optional)'
							/>
						</span>
					</p>
				</div>
				<label className='mt-10'>
					<input
						className='login-form__input-checkbox'
						name='rememberme'
						type='checkbox'
						defaultValue={persistUserDetails ? 'true' : 'false'}
						onChange={handlePersistUserDetails}
						checked={persistUserDetails}
					/>{' '}
					<span>Save my details for easier checkout later</span>
				</label>
			</div>
			<div className='checkout-shipping-fields  cafeu-woo-form-shipping-form-style-custom'>
				<h4 className='cafeu-billing-details-title mt-10'>Delivery</h4>
				<label className='mt-10'>
					<input
						className='login-form__input-checkbox'
						name='shouldDeliverOrder'
						type='checkbox'
						onChange={handleShouldDeliverOrder}
						checked={!shouldDeliverOrder}
					/>{' '}
					<span>Do not deliver, I will pick the order myself</span>
				</label>
			</div>
			<div className='checkout-shipping-fields  cafeu-woo-form-shipping-form-style-custom'>
				<h4 className='cafeu-billing-details-title mt-10'>Payment</h4>
				<label className='mt-10'>
					<input
						className='login-form__input-checkbox'
						name='cashOnDelivery'
						type='checkbox'
						onChange={handlePayCashOnDelivery}
						checked={payCashOnDelivery}
					/>{' '}
					<span>I will pay cash on delivery</span>
				</label>
			</div>
			<div className='checkout-additional-fields mt-10'>
				<h4 className='cafeu-billing-details-title'>Additional information</h4>
				<div className='checkout-additional-fields__field-wrapper'>
					<p
						className='form-row notes'
						id='order_comments_field'
						data-priority=''>
						<label htmlFor='order_comments' className='Name'>
							Order notes&nbsp;<span className='optional'>(optional)</span>
						</label>
						<span className='checkout-input-wrapper'>
							<textarea
								name='orderNotes'
								className='input-text '
								placeholder='Notes about your order, e.g. special notes for delivery.'
								rows={2}
								cols={5}></textarea>
						</span>
					</p>{' '}
				</div>
			</div>
		</div>
	);
};

export default BillingSection;
