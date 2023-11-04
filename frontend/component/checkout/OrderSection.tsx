'use client';
import { useAppContext } from '@/context/AppContext';
import React from 'react';

const OrderSection: React.FC = () => {
	const { cart, cartTotal } = useAppContext();
	return (
		<div className='col-xxl-6 col-xl-6 col-lg-6'>
			<h4 className='cafeu-billing-details-title' id='order_review_heading'>
				Your order
			</h4>
			<div id='order_review' className='checkout-checkout-review-order'>
				<table className='shop_table checkout-checkout-review-order-table'>
					<thead>
						<tr>
							<th className='product-name'>Product</th>
							<th className='product-total'>Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{cart.length === 0 ? (
							<tr className='empty-checkout-tr'>
								<td className='empty-checkout-td'>
									<div className='empty-checkout-container'>
										<p className='empty-checkout-text'>No Product In Cart</p>
									</div>
								</td>
							</tr>
						) : (
							cart.map((item) => (
								<tr className='cart_item' key={item.id}>
									<td className='product-name'>
										<div className='product-checkout-image-list'>
											<img src={item.imgSrc} alt='' />
											{item.name}&nbsp;
											<strong className='product-quantity'>×&nbsp;{item.quantity}</strong>
										</div>
									</td>
									<td className='product-total'>
										<span className='checkout-Price-amount amount'>
											<bdi>
												<span className='checkout-Price-currencySymbol'>$</span>
												{item.price * item.quantity}
											</bdi>
										</span>
									</td>
								</tr>
							))
						)}
					</tbody>
					<tfoot>
						<tr className='cart-subtotal'>
							<th>Subtotal</th>
							<td>
								<span className='checkout-Price-amount amount'>
									<bdi>
										<span className='checkout-Price-currencySymbol'>$</span>
										{cartTotal.toFixed(2)}
									</bdi>
								</span>
							</td>
						</tr>
						<tr className='order-total'>
							<th>Total</th>
							<td>
								<strong>
									<span className='checkout-Price-amount amount'>
										<bdi>
											<span className='checkout-Price-currencySymbol'>$</span>
											{cartTotal.toFixed(2)}
										</bdi>
									</span>
								</strong>{' '}
							</td>
						</tr>
					</tfoot>
				</table>

				<div id='payment' className='checkout-checkout-payment'>
					<ul className='wc_payment_methods payment_methods methods'>
						<li className='checkout-notice checkout-notice--info checkout-info'>
							Sorry, it seems that there are no available payment methods for your state. Please contact us if you
							require assistance or wish to make alternate arrangements.
						</li>
					</ul>
					<div className='form-row place-order'>
						<noscript>
							Since your browser does not support JavaScript, or it is disabled, please ensure you click the{' '}
							<em>Update Totals</em> button before placing your order. You may be charged more than the amount stated
							above if you fail to do so. <br />
							<button
								type='submit'
								className='button alt wp-element-button'
								name='checkout_checkout_update_totals'
								value='Update totals'>
								Update totals
							</button>
						</noscript>

						<div className='checkout-terms-and-conditions-wrapper'>
							<div className='checkout-privacy-policy-text'>
								<p>
									Your personal data will be used to process your order, support your experience throughout this
									website, and for other purposes described in our{' '}
									<a href='#' className='checkout-privacy-policy-link' target='_blank'>
										privacy policy
									</a>
									.
								</p>
							</div>
						</div>

						<button
							type='submit'
							className='button alt wp-element-button'
							name='checkout_checkout_place_order'
							id='place_order'
							value='Place order'
							data-value='Place order'>
							Place order
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSection;
