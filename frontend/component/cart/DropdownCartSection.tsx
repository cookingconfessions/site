'use client';
import { useCafeuContext } from '@/context/CafeuContext';
import Link from 'next/link';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
const DropdownCartSection = () => {
	const { cart, removeFromCart } = useCafeuContext();
	return (
		<OverlayScrollbarsComponent className='cart-menu'>
			<ul className='cart-ul'>
				{cart.length === 0 ? (
					<div className='no-product-cart-dropdown-container'>
						<p className='no-product-dropdown-text'>No Product In Cart</p>
						<Link href='/shop' className='custom-btn'>
							Add Products
						</Link>
					</div>
				) : (
					cart.map((item) => (
						<li className='cart-list' key={item.id}>
							<div className='d-flex align-items-center'>
								<div className='cart-img'>
									<img src={item.imgSrc} alt={item.name} />
								</div>
								<div className='cart-product-details'>
									<Link href={`/shop/${item.slug}`} className='product-name cart-px-name'>
										{item.name}
									</Link>
									<p className='price'>${item.price}</p>
								</div>
							</div>
							<a className='remove-icon' role='button' onClick={() => removeFromCart(item.id)}>
								<span className='icofont-ui-delete'></span>
							</a>
						</li>
					))
				)}
			</ul>
			<div className='cart-modal-btn'>
				<Link href='/menu' className='custom-btn'>
					Shop
				</Link>
				<Link href='/cart' className='custom-btn'>
					View Cart
				</Link>
			</div>
		</OverlayScrollbarsComponent>
	);
};

export default DropdownCartSection;
