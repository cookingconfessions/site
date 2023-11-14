'use client';
import Link from 'next/link';

const AboutSection = () => {
	return (
		<section>
			<div className='about about-1 mb-70 mt-25'>
				<div className='container'>
					<div className='row'>
						<div
							className='col-lg-6 col-md-6 mb-4'
							data-aos='fade-right'
							data-aos-duration='1000'>
							<div className='about-img'>
								<img src='img/about-cooking-confessions-sk.png' alt='' />
							</div>
						</div>

						<div
							className='col-lg-6 col-md-6 mb-4'
							data-aos='fade-left'
							data-aos-duration='1000'>
							<div className='h-100 d-flex align-items-center pl-40'>
								<div className='about-details'>
									<span className='theme-3 sm-title'>About Us</span>
									<h2 className='about-title mb-3'>Why Choose Us</h2>
									<p className='about-des mb-4'>
										We are a Kenyan restaurant located at the heart of Slovakia.{' '}
										We offer mouth watering and authentic Kenyan/African
										Cuisine. <br /> Offering you the convenience of{' '}
										<b>tasty meals</b> at an affordable price is what we thrive
										on.
									</p>
									<div className='service-list'>
										<ul className='service-ul'>
											<li className='ab-service-li mb-4'>
												<div className='service-icon'>
													<img src='img/icon/5.png' alt='' />
												</div>
												<div className='service-name-des'>
													<h4 className='service-name mb-1'>
														Catering Service
													</h4>
													<p className='service-des'>
														We offer catering services for grill parties and{' '}
														<br /> any of your special events.
													</p>
												</div>
											</li>
											<li className='ab-service-li mb-4'>
												<div className='service-icon'>
													<img src='img/icon/6.png' alt='' />
												</div>
												<div className='service-name-des'>
													<h4 className='service-name mb-1'>
														Top African Dishes
													</h4>
													<p className='service-des'>
														Order an African dish from our menu and
														<br /> experience <b>a little slice of Heaven</b>.
													</p>
												</div>
											</li>
										</ul>
									</div>
									<div className='service-button-wrap mt-40'>
										<Link href='/about' className='custom-btn'>
											About Us
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
