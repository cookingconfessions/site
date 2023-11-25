'use client';
import { useAppContext } from '@/context/AppContext';
import { ProductCardProps } from '@/types/menu';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
	const { addToCart } = useAppContext();

	const router = useRouter();

	const openProductDetails = () => {
		router.push(`/menu/${item.slug}`);
	};

	return (
		<Card className={`col custom-card ${item.isAvailable ? '' : 'opacity-25'}`}>
			<Card.Img
				variant='top'
				src={item.image}
				alt={item.name}
				onClick={() => openProductDetails()}
				// style={{ height: '200px' }}
			/>
			<Card.Body onClick={() => openProductDetails()}>
				{/* <Card.Title>{item.name}</Card.Title> */}
				<h4 className='shop-product-title'>
					<a href={`/menu/${item.slug}`}>{item.name}</a>
				</h4>
				<div className='shop-product-price'>
					<span className='shop-price'>{item.price}&nbsp;&euro;</span>
				</div>
			</Card.Body>
			<Card.Footer className='d-flex justify-content-around'>
				<a role='button' href={`/menu/${item.slug}`}>
					<i className='icofont-eye'></i>
				</a>
				<a
					role='button'
					onClick={() => (item.isAvailable ? addToCart(item.id) : '')}>
					<i className='icofont-shopping-cart'></i>
				</a>
			</Card.Footer>
		</Card>
	);
};

export default ProductCard;
