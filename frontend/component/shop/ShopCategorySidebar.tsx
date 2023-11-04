import { useAppContext } from '@/context/AppContext';

const ShopCategorySidebar = () => {
	const { selectedCategory, handleCategoryChange } = useAppContext();
	const categories = ['All', 'Appetizers', 'Salads', 'Entrees', 'Sides', 'Beverages', 'Desserts', 'Specials'];

	return (
		<div className='sidebar-single sidebar-product-category mb-50' data-aos='fade-up' data-aos-duration='1500'>
			<h4 className='sidebar-title mb-25'>Product Categories</h4>
			<ul className='sidebar-categories'>
				{categories.map((category) => (
					<li key={category}>
						<a
							role='button'
							onClick={() => handleCategoryChange(category)}
							className={selectedCategory === category ? 'active' : ''}>
							{category}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ShopCategorySidebar;
