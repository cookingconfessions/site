import { useAppContext } from '@/context/AppContext';
import { BannerProps } from '@/types/home';
import React, { useEffect } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BannerSection: React.FC<BannerProps> = ({ theme }) => {
	const { bannerItems, loadBannerItems } = useAppContext();

	useEffect(() => {
		loadBannerItems();
	}, []);

	return (
		<section>
			<div className={`banner ${theme}`}>
				<div className='container'>
					<div className='banner-slider'>
						<Swiper
							autoplay={{ delay: 3000 }}
							pagination={{
								el: '.banner-pagination',
								dynamicBullets: true,
								clickable: true,
							}}
							modules={[Autoplay, Pagination]}
							className='swiper bannerSlider'>
							{bannerItems.map((item) => (
								<SwiperSlide className='swiper-slide' key={item.id}>
									<div className='row'>
										<div className='col-md-6 my-2'>
											<div className='slider-details'>
												<div className='text-inner'>
													<span className='sm-title mb-0'>We got you..</span>
													<h1 className='banner-title'>
														{item.name.split(' ')[0]}{' '}
														<a href=''>{item.name.split(' ')[1]}</a>{' '}
														{item.name.split(' ')[2]}
													</h1>
													<p className='banner-des'>{item.description}</p>
													<div className='banner-btn-sec mt-3'>
														<a href='' className='custom-btn'>
															Order Now
														</a>
													</div>
												</div>
											</div>
										</div>
										<div className='col-md-6 my-2'>
											<div className='slider-item-img'>
												<img src={item.image} alt='Image not found' />
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
				<div className='banner-pagination'></div>
			</div>
		</section>
	);
};

export default BannerSection;
