'use client';

import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';
import ShopAllProductSection from './ShopAllProductSection';
import ShopPriceFilter from './ShopPriceFilter';
import ShopSearchBarSection from './ShopSearchBarSection';
import ShopTagFilter from './ShopTagFilter';
import ShopTopSortingSection from './ShopTopSortingSection';

const ShopSection = () => {
	const { loadCategories, loadShopItems } = useAppContext();

	useEffect(() => {
		loadCategories();
		loadShopItems();
	}, []);

	return (
		<div className='shop-area pb-55'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-4'>
						<div className='sidebar-default'>
							<ShopSearchBarSection />
							<ShopPriceFilter />
							<ShopTagFilter />
						</div>
					</div>
					<div className='col-lg-8'>
						<div className='shop-left-wrapper'>
							<ShopTopSortingSection />
							<ShopAllProductSection />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopSection;
