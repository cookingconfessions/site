'use client';
import { useCafeuContext } from '@/context/CafeuContext';
import MenuProducts from './MenuProducts';

const MenuPageSection = () => {
	const { menuItemsToShow } = useCafeuContext();
	return (
		<>
			<MenuProducts style='product-3' showMoreBtn={false} endIndex={menuItemsToShow} />
		</>
	);
};

export default MenuPageSection;
