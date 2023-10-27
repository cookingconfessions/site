'use client';
import { Form } from 'react-bootstrap';

const BillingSection = () => {
	return (
		<div className='col-xxl-6 col-xl-6 col-lg-6 mb-lg-0 mb-50 mb-lg-0'>
			<div className='checkout-billing-fields'>
				<h4 className='cafeu-billing-details-title'>Billing details</h4>

				<div className='checkout-billing-fields__field-wrapper cafeu-submit-form-default cafeu-woo-form-billing-form-style-custom'>
					<p className='form-row form-row-first validate-required' id='billing_first_name_field'>
						<label htmlFor='billing_first_name' className=''>
							First name&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='text'
								className='input-text '
								name='billing_first_name'
								id='billing_first_name'
								placeholder=''
								readOnly
							/>
						</span>
					</p>
					<p className='form-row form-row-last validate-required' id='billing_last_name_field'>
						<label htmlFor='billing_last_name' className=''>
							Last name&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='text'
								className='input-text '
								name='billing_last_name'
								id='billing_last_name'
								placeholder=''
								readOnly
							/>
						</span>
					</p>
					<p className='form-row form-row-first validate-required' id='billing_first_name_field'>
						<label htmlFor='billing_phone' className=''>
							Phone number&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='tel'
								className='input-text '
								name='billing_phone'
								id='billing_phone'
								placeholder=''
								readOnly
							/>
						</span>
					</p>
					<p className='form-row form-row-last validate-required' id='billing_last_name_field'>
						<label htmlFor='billing_email' className=''>
							Email address&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='email'
								className='input-text '
								name='billing_email'
								id='billing_email'
								placeholder=''
								readOnly
							/>
						</span>
					</p>
					<p
						className='form-row form-row-wide address-field update_totals_on_change validate-required'
						id='billing_country_field'>
						<label htmlFor='billing_country' className=''>
							Country / Region&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<Form.Select
								name='billing_country'
								id='billing_country'
								className='country_to_state country_select select2-hidden-accessible'>
								<option value=''>Select a country / region…</option>
								<option value='AF'>Afghanistan</option>
								<option value='AX'>Åland Islands</option>
								<option value='AL'>Albania</option>
								<option value='ZM'>Zambia</option>
								<option value='ZW'>Zimbabwe</option>
							</Form.Select>
						</span>
					</p>
					<p className='form-row address-field validate-required' id='billing_address_1_field'>
						<label htmlFor='billing_address_1' className=''>
							Street address&nbsp;
							<abbr className='required' title='required'></abbr>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='text'
								className='input-text  '
								name='billing_address_1'
								id='billing_address_1'
								placeholder='House number and street name'
								readOnly
							/>
						</span>
					</p>
					<p className='form-row address-field validate-required' id='billing_address_2_field'>
						<label htmlFor='billing_address_2'>
							Apartment, suite, unit, etc.&nbsp;
							<span className='optional'>(optional)</span>
						</label>
						<span className='checkout-input-wrapper'>
							<input
								type='text'
								className='input-text  '
								name='billing_address_2'
								id='billing_address_2'
								placeholder='Apartment, suite, unit, etc. (optional)'
								readOnly
							/>
						</span>
					</p>
				</div>
				<label className='rememberme mt-10'>
					<input
						className='login-form__input-checkbox'
						name='rememberme'
						type='checkbox'
						id='rememberme'
						value='forever'
						readOnly
						checked
					/>{' '}
					<span>Save my details for easier checkout later</span>
				</label>
			</div>
			<div className='checkout-shipping-fields  cafeu-woo-form-shipping-form-style-custom'></div>
			<div className='checkout-additional-fields mt-10'>
				<h4 className='cafeu-billing-details-title'>Additional information</h4>

				<div className='checkout-additional-fields__field-wrapper'>
					<p className='form-row notes' id='order_comments_field' data-priority=''>
						<label htmlFor='order_comments' className='Name'>
							Order notes&nbsp;<span className='optional'>(optional)</span>
						</label>
						<span className='checkout-input-wrapper'>
							<textarea
								name='order_comments'
								className='input-text '
								id='order_comments'
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
