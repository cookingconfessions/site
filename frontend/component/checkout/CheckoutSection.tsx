'use client';
import { useCafeuContext } from '@/context/CafeuContext';
import BillingSection from './BillingSection';
import OrderSection from './OrderSection';

const CheckoutSection = () => {
	const { haveCoupon, handleCouponBtn } = useCafeuContext();
	return (
		<div className='page-area pb-85'>
			<div className='container'>
				<div className='row'>
					<div className='col-xl-12'>
						<div className='cafeu-page-content'>
							<div className='post-entry post-entry--top-margin'>
								<div className='checkout'>
									<div className='checkout-notices-wrapper'></div>
									<div className='checkout-form-coupon-toggle'>
										<div className='checkout-info'>
											Have a coupon?{' '}
											<a className='showcoupon' role='button' onClick={handleCouponBtn}>
												Click here to enter your code
											</a>
										</div>
									</div>

									<form className={`checkout_coupon checkout-form-coupon ${haveCoupon ? 'd-block' : 'd-none'}`}>
										<p>If you have a coupon code, please apply it below.</p>

										<p className='form-row form-row-first'>
											<label htmlFor='coupon_code' className='screen-reader-text'>
												Coupon:
											</label>
											<input
												type='text'
												name='coupon_code'
												className='input-text'
												placeholder='Coupon code'
												id='coupon_code'
												readOnly
											/>
										</p>

										<p className='form-row form-row-last'>
											<button type='submit' className='button wp-element-button' name='apply_coupon'>
												Apply coupon
											</button>
										</p>

										<div className='clear'></div>
									</form>
									<div className='checkout-notices-wrapper'></div>
									<form className='checkout checkout-checkout'>
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
