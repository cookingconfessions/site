'use client';
import { useAppContext } from '@/context/AppContext';
import { ProductCardProps } from '@/types/menu';
import Link from 'next/link';
import React from 'react';

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
	const { addToCart, openLightBoxModal } = useAppContext();

	return (
		<div
			className={`col ${item.isAvailable ? '' : 'opacity-25'}`}
			key={item.id}>
			<div className='shop-product-item mb-30'>
				<div className='shop-product-item-inner'>
					<div className='shop-product-img w-100'>
						<Link href={`/menu/${item.slug}`}>
							<img src={item.image} alt={item.name} />
						</Link>
						{/* {item.sale && <span className='shop-onsale'>Sale!</span>} */}
						<div className='shop-product-action'>
							<a
								role='button'
								onClick={() => (item.isAvailable ? addToCart(item.id) : '')}>
								<i className='icofont-shopping-cart'></i>
							</a>
							<a role='button' onClick={() => openLightBoxModal(item)}>
								<i className='icofont-eye'></i>
							</a>
						</div>
					</div>
					<div className='shop-product-content'>
						<h4 className='shop-product-title'>
							<a href={`/menu/${item.slug}`}>{item.name}</a>
						</h4>
						<div className='shop-product-price'>
							<span className='shop-price'>{item.price}&nbsp;&euro;</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
