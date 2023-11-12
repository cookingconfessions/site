// ShopTagFilter.tsx
import { useAppContext } from '@/context/AppContext';

const ShopTagFilter = () => {
	const { selectedTags, handleTagChange, categories } = useAppContext();

	return (
		<div className='sidebar-single mb-50' data-aos='fade-up' data-aos-duration='3000'>
			<h4 className='sidebar-title mb-25'>Product Tags</h4>
			<ul className='sidebar-tags'>
				{categories.map((category) => (
					<li
						key={category.id}
						className={selectedTags.includes(category.name) ? 'active' : ''}
						onClick={() => handleTagChange(category.name)} // Change this line
					>
						{category.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ShopTagFilter;
