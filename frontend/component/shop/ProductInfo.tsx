import { useAppContext } from '@/context/AppContext';
import { MenuItem } from '@/types/menu';
import React from 'react';
interface InfoProp {
	shopData: MenuItem;
}
const ProductInfo: React.FC<InfoProp> = ({ shopData }) => {
	const { addToCartWithQuantity } = useAppContext();

	return (
		<div className='product-main-info mb-50'>
			<h4 className='name'>{shopData.name}</h4>
			<div className='price-section'>
				<p>Price: ${shopData.price}</p>
			</div>
			<ul className='info-list'>
				<li>
					<span>Availability:</span>
					<p>{shopData.isAvailable ? 'In Stock' : 'Not available'} </p>
				</li>
				<li>
					<span>Product Code:</span>
					<p>#{shopData.code}</p>
				</li>
				<li>
					<span>Tags:</span>
					<p>{shopData.tags.map((tag) => tag.name).join(',')}</p>
				</li>
			</ul>

			<div className='cart-sec'>
				<div className='btn-sec'>
					<a
						className='custom-btn'
						role='button'
						onClick={() => addToCartWithQuantity(shopData.id, 1)}>
						Add To Cart
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProductInfo;
