'use client';
import { useAppContext } from '@/context/AppContext';
import MenuProducts from './MenuProducts';

const MenuPageSection = () => {
	const { menuItemsToShow } = useAppContext();
	return (
		<>
			<MenuProducts style='product-3' showMoreBtn={false} endIndex={menuItemsToShow} />
		</>
	);
};

export default MenuPageSection;
