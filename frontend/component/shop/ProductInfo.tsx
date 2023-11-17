import { useAppContext } from '@/context/AppContext';
import { MenuItem } from '@/types/menu';
import React, { useEffect } from 'react';
interface InfoProp {
	shopData: MenuItem;
}
const ProductInfo: React.FC<InfoProp> = ({ shopData }) => {
	const { addToCartWithQuantity, loadShopItems, shopItems } = useAppContext();

	useEffect(() => {
		if (!shopItems.length) {
			loadShopItems();
		}
	}, []);

	return (
		<div className='product-main-info mb-50'>
			<h4 className='name'>{shopData.name}</h4>
			<div className='price-section'>
				<p>Price: {shopData.price}&nbsp;&euro;</p>
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
				<div className={`btn-sec ${shopData.isAvailable ? '' : 'opacity-25'}`}>
					<button
						className='custom-btn'
						disabled={!shopData.isAvailable}
						onClick={() => addToCartWithQuantity(shopData.id, 1)}>
						Add To Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductInfo;
