'use client';
import { useAppContext } from '@/context/AppContext';
import { CouponFormElements } from '@/types/form';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

const CouponSection = () => {
	const {
		cartTotal,
		cart,
		deliveryFee,
		couponCode,
		applyCoupon,
	} = useAppContext();
	const [mainTotal, setMainTotal] = useState<number>(0);
	const [discount, setDiscount] = useState<number>(0);

	const applyCouponCode = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const elements = (event.target as HTMLFormElement)
			.elements as CouponFormElements;
		const couponCode = elements.coupon.value;

		applyCoupon(couponCode);
	};

	useEffect(() => {
		let total = cartTotal;

		if (couponCode?.isActive) {
			setDiscount(total * (couponCode.discountPercentage / 100));
			total = total * (1 - couponCode.discountPercentage / 100);
		}

		setMainTotal(total);
	}, [cartTotal, couponCode, deliveryFee]);

	return (
		<section>
			<div className='coupon-cart cmb-7'>
				<div className='container'>
					<div className='row justify-content-between'>
						<div
							className='col-md-6 mb-4'
							data-aos='fade-up'
							data-aos-duration='500'>
							<div className='coupon-inside'>
								<h2>Discount Coupon Codes</h2>
								<p>
									Enter your coupon code if you have one and get discount up to
									50% offer you will get discount with free delivery.
								</p>
								<form onSubmit={applyCouponCode} action='#'>
									<div className='coupon-form'>
										<input
											type='text'
											name='coupon'
											className='form-control coupon-input'
											placeholder='Input Your Coupon Code'
											defaultValue={
												couponCode?.isActive ? couponCode?.code : ''
											}
										/>
										<button
											disabled={couponCode !== undefined}
											className={`custom-btn ${
												couponCode?.code ? 'opacity-25' : ''
											}`}
											type='submit'>
											Apply Coupon
										</button>
									</div>
								</form>
							</div>
						</div>
						<div
							className='col-md-4 mb-4'
							data-aos='fade-up'
							data-aos-duration='500'>
							<div className='cart-total'>
								<h2>Cart Totals</h2>
								<table className='table table-borderless border-top border-bottom'>
									<tbody>
										<tr>
											<td>Sub Total:</td>
											<td className='cart-price'>
												{cartTotal.toFixed(2)}&nbsp;&euro;
											</td>
										</tr>
										<tr>
											<td>Discount:</td>
											<td className='cart-price'>
												{discount.toFixed(2)}&nbsp;&euro;
											</td>
										</tr>
									</tbody>
								</table>
								<div className='total-sum'>
									<p>Total:</p>
									<p className='sum-price'>
										{cart.length === 0 ? '0.00' : ` ${mainTotal.toFixed(2)}`}{' '}
										&nbsp;&euro;
									</p>
								</div>
								{cart.length !== 0 && (
									<div className='submit-cart'>
										<p className='multiple'>Checkout with multiple items</p>
										<div className='subbit-cart-buttons mt-15'>
											<Link className='custom-btn' href='/checkout'>
												Checkout
											</Link>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CouponSection;
