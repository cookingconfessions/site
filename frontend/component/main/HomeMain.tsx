'use client';
import BannerSection from '../banner/BannerSection';
import FoodCategorySection from '../category/FoodCategorySection';
import OrderFeatureSection from '../feature/OrderFeatureSection';
import MenuProducts from '../menu/MenuProducts';
import ScheduleSection from '../schedule/ScheduleSection';

const HomeMain = () => {
	return (
		<>
			<BannerSection theme='banner-3' />
			<div className='cpy-8'>
				<MenuProducts style='product-3' showMoreBtn={true} />
			</div>
			<FoodCategorySection />
			<OrderFeatureSection />
			<ScheduleSection />
		</>
	);
};

export default HomeMain;
