import { bannerData } from '@/data/Data';
import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface BannerProps {
	startIndex?: number;
	endIndex: number;
	theme: string;
}
const BannerSection: React.FC<BannerProps> = ({ startIndex, endIndex, theme }) => {
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
							{startIndex !== undefined && endIndex !== undefined
								? bannerData.slice(startIndex, endIndex).map((item) => (
										<SwiperSlide className='swiper-slide' key={item.id}>
											<div className='row'>
												<div className='col-md-6 my-2'>
													<div className='slider-details'>
														<div className='text-inner'>
															<span className='sm-title mb-0'>Top Dishes</span>
															<h1 className='banner-title'>
																{item.bannerTitleFirst} <a href=''>{item.bannerTitleHighlight}</a>{' '}
																{item.bannerTitleLast}
															</h1>
															<p className='banner-des'>
																Lorem ipsum dolor sit amet, conscetur adipiscing elit, sed do eimod <br /> tempor
																incididunt ut labore et dolore magna aliqua Quis
															</p>

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
														<img src={item.imgSrc} alt='Image not found' />
													</div>
												</div>
											</div>
										</SwiperSlide>
								  ))
								: bannerData.slice(endIndex).map((item) => (
										<SwiperSlide className='swiper-slide' key={item.id}>
											<div className='row'>
												<div className='col-md-6 my-2'>
													<div className='slider-details'>
														<div className='text-inner'>
															<span className='sm-title mb-0'>Top Dishes</span>
															<h1 className='banner-title'>
																{item.bannerTitleFirst} <a href=''>{item.bannerTitleHighlight}</a>{' '}
																{item.bannerTitleLast}
															</h1>
															<p className='banner-des'>
																Lorem ipsum dolor sit amet, conscetur adipiscing elit, sed do eimod <br /> tempor
																incididunt ut labore et dolore magna aliqua Quis
															</p>

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
														<img src={item.imgSrc} alt='Image not found' />
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
