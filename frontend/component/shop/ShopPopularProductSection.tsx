import { productList } from '@/data/Data';

const ShopPopularProductSection = () => {
	return (
		<div className='sidebar-single sidebar-product-post mb-50' data-aos='fade-up' data-aos-duration='2000'>
			<h4 className='sidebar-title mb-25'>Popular Products</h4>
			{productList.slice(0, 3).map((item) => (
				<div className='sidebar-post-single' key={item.id}>
					<div className='sidebar-post-img'>
						<a href={`/menu/${item.slug}`}>
							<img src={item.imgSrc} alt={item.name} />
						</a>
					</div>
					<div className='sidebar-post-content'>
						<h5 className='sidebar-post-title'>
							<a href={`/menu/${item.slug}`}>{item.name}</a>
						</h5>
						<span className='sidebar-product-price'>{item.priceRange}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default ShopPopularProductSection;
