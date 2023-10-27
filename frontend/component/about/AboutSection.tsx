'use client';
import Link from 'next/link';

const AboutSection = () => {
	return (
		<section>
			<div className='about about-1 mb-70 mt-25'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-6 col-md-6 mb-4' data-aos='fade-right' data-aos-duration='1000'>
							<div className='about-img'>
								<img src='img/image/exparience.png' alt='' />
							</div>
						</div>

						<div className='col-lg-6 col-md-6 mb-4' data-aos='fade-left' data-aos-duration='1000'>
							<div className='h-100 d-flex align-items-center pl-40'>
								<div className='about-details'>
									<span className='theme-3 sm-title'>About Us</span>
									<h2 className='about-title mb-3'>Why We Are The Best</h2>
									<p className='about-des mb-4'>
										Quis autem vel eum iure reprehenderit qui in evoluptate velit esse qua nihil
										<br /> molestiae consequatur, vel illum qui dolorem eum fugiat quvoluptas nulla <br /> pariatureaque
										ipsa quae ab illo inventore veritatis et quasi architecto <br /> beatae vitae dicta sunt explicabo.
									</p>
									<div className='service-list'>
										<ul className='service-ul'>
											<li className='ab-service-li mb-4'>
												<div className='service-icon'>
													<img src='img/icon/5.png' alt='' />
												</div>
												<div className='service-name-des'>
													<h4 className='service-name mb-1'>Buffet Service</h4>
													<p className='service-des'>
														Qariatureaque ipsa quae a illo inventore <br /> veritatis et quasi architecto
													</p>
												</div>
											</li>
											<li className='ab-service-li mb-4'>
												<div className='service-icon'>
													<img src='img/icon/6.png' alt='' />
												</div>
												<div className='service-name-des'>
													<h4 className='service-name mb-1'>Online Booking</h4>
													<p className='service-des'>
														Qariatureaque ipsa quae a illo inventore <br /> veritatis et quasi architecto
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
