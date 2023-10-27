'use client';
import React from 'react';
import ProductLightBoxModal from '../modal/ProductLightBoxModal';
import ProductInfo from './ProductInfo';
import ShopDescription from './ShopDescription';
import ShopRecentProducts from './ShopRecentProducts';
interface ShopDetailsProp {
	shopData: {
		imgSrc: string;
		name: string;
		price: number;
		id: number;
	};
}
const ShopDetailSection: React.FC<ShopDetailsProp> = ({ shopData }) => {
	return (
		<div className='shop-area pt-105 pb-55'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6' data-aos='fade-up' data-aos-duration='1000'>
						<div className='view-img mb-50'>
							<img src={`/${shopData.imgSrc}`} alt='' />
						</div>
					</div>
					<div className='col-md-6' data-aos='fade-up' data-aos-duration='1500'>
						<ProductInfo shopData={shopData} />
					</div>
				</div>
				<div className='row'>
					<div className='col-12' data-aos='fade-up' data-aos-duration='1000'>
						<ShopDescription />
					</div>
				</div>
				<div className='row mt-10'>
					<div className='col-12'>
						<ShopRecentProducts />
					</div>
				</div>
			</div>
			<ProductLightBoxModal />
		</div>
	);
};

export default ShopDetailSection;
