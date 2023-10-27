import { productList } from '@/data/Data';
import ProductCard from '../menu/ProductCard';

const ShopRecentProducts = () => {
	return (
		<div className='menu-product mb-25'>
			<div className='product-inner p-0'>
				<div className='section-head text-center' data-aos='fade-up' data-aos-duration='1000'>
					<h2 className='review-title'>You may also like</h2>
				</div>

				<div className='row mt-40'>
					{productList.slice(1, 5).map((item) => (
						<ProductCard item={item} key={item.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ShopRecentProducts;
