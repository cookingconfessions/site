import { useHomeContext } from '@/context/HomeContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const FoodCategorySection = () => {
	const [slides, setSlides] = useState<number>(0);
	const { categories } = useHomeContext();

	const setSlidesPerview = () => {
		setSlides(
			window.innerWidth <= 500
				? 1
				: window.innerWidth <= 992
				? 2
				: window.innerWidth <= 1200
				? 3
				: window.innerWidth <= 1400
				? 4
				: window.innerWidth > 1400
				? 5
				: 0
		);
	};

	useEffect(() => {
		setSlidesPerview();

		window.addEventListener('resize', setSlidesPerview);

		return () => {
			window.removeEventListener('resize', setSlidesPerview);
		};
	}, []);
	return (
		<div className='cb-category-area bg-light-blue pt-80 pb-80'>
			<div className='cb-category-wrapper'>
				<div className='cb-category-inner'>
					<div className='container-fluid g-0'>
						<div className='row align-items-center justify-content-center'>
							<div className='section-head text-center' data-aos='fade-up' data-aos-duration='500'>
								<span className='theme-3 sm-title'>All tastes</span>
								<h2 className='sec-title'>We got you sorted..</h2>
							</div>
							<div className='col-xl-10 col-lg-9 col-md-8' data-aos='fade-up' data-aos-duration='1500'>
								<div className='cb-category-inner-slider-wrapper'>
									<Swiper
										className='swiper-container swiper cb-category-active'
										slidesPerView={slides}
										spaceBetween={35}
										autoplay={{ delay: 3000 }}
										modules={[Autoplay]}
										loop={true}>
										{categories.map((item) => (
											<SwiperSlide className='swiper-slide' key={item.id}>
												<div className='cb-category-card'>
													<img src={item.image} alt='category img' />
													<div className='cb-category-card-text'>
														<h4>
															<Link href='/menu' className='cb-category-cart-name'>
																{item.name}
															</Link>
														</h4>
													</div>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoodCategorySection;
