import { MenuItem, ShopDetailsProp } from '@/types/menu';
import { useApiClient } from '@/utils/api-client';
import { useEffect, useState } from 'react';
import ProductCard from '../menu/ProductCard';

const ShopRecentProducts: React.FC<ShopDetailsProp> = ({ shopData }) => {
	const [similarProducts, setSimilarProducts] = useState<MenuItem[]>([]);

	useEffect(() => {
		useApiClient()
			.getSimilarProducts(shopData.id)
			.then((items) => setSimilarProducts(items));
	}, [shopData.id]);

	return (
		<div className='menu-product mb-25'>
			<div className='product-inner p-0'>
				<div className='section-head text-center' data-aos='fade-up' data-aos-duration='1000'>
					<h2 className='review-title'>You may also like</h2>
				</div>

				<div className='row row-cols-xxl-4 row-cols-lg-4 row-cols-md-3 row-cols-2'>
					{similarProducts.slice(0, 1).map((item) => (
						<ProductCard item={item} key={item.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ShopRecentProducts;
