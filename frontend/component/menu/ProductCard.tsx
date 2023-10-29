'use client';
import { useCafeuContext } from '@/context/CafeuContext';
import { ProductCardProps } from '@/types/menu';
import React from 'react';

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
	const { addToCart, openLightBoxModal } = useCafeuContext();

	return (
		<div className='col' key={item.id}>
			<div className='shop-product-item mb-30'>
				<div className='shop-product-item-inner'>
					<div className='shop-product-img w-100'>
						<a href={`/menu/${item.slug}`}>
							<img src={`/${item.imgSrc}`} alt={item.name} />
						</a>
						{item.sale && <span className='shop-onsale'>Sale!</span>}
						<div className='shop-product-action'>
							<a role='button' onClick={() => addToCart(item.id)}>
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
							<span className='shop-price'>$ {item.price}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
