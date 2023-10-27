import { useCafeuContext } from '@/context/CafeuContext';
import Link from 'next/link';
import React from 'react';
interface FooterProp {
	style: string;
}
const FooterSection: React.FC<FooterProp> = ({ style }) => {
	const { currentYear } = useCafeuContext();
	return (
		<footer>
			<div className={`footer-section ${style}`} data-background='/img/footer-bg.png'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-3 col-md-6 col-sm-6 my-2 smpadright40' data-aos='fade-up' data-aos-duration='500'>
							<div className='footer-content-wrapper'>
								<div className='footer-logo mb-4'>
									<img src='/img/logo/logo-white.png' alt='' />
								</div>
								<p>Lorem ipsum dolor sit consectetur, ame adipiscing elit, sed do</p>
								<ul className='address'>
									<li>
										<span className='icofont-location-pin'></span>
										<p className='address-info'>4920 Trails End Road Ft United States, FL 33311</p>
									</li>

									<li>
										<span className='icofont-email'></span>
										<div className='address-inner'>
											<p className='address-info'>
												<a href='mailto:nfo@example.com'>nfo@example.com</a>
											</p>
											<p className='address-info'>
												<a href='mailto:test@example.com'>test@example.com</a>
											</p>
										</div>
									</li>

									<li>
										<span className='icofont-ui-call'> </span>
										<div className='address-inner'>
											<p className='address-info'>
												<a href='tel:+123456679123'>+123 456 679 123</a>
											</p>
											<p className='address-info'>
												<a href='tel:+123456789'>+123 456 789</a>
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>

						<div className='col-lg-3 col-md-6 col-sm-6 my-2 padleft40' data-aos='fade-up' data-aos-duration='500'>
							<div className='footer-content-wrapper'>
								<div className='footer-sec-head mb-4'>
									<h4 className='footer-widget-title'>Quick links</h4>
								</div>
								<ul className='qu-link'>
									<li className='foot-list'>
										<Link href='/' className='footer-link'>
											Home
										</Link>
									</li>
									<li className='foot-list'>
										<Link href='/menu' className='footer-link'>
											Menu
										</Link>
									</li>
									<li className='foot-list'>
										<Link href='/about' className='footer-link'>
											About Us
										</Link>
									</li>
									<li className='foot-list'>
										<Link href='/faq' className='footer-link'>
											Help
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className='col-lg-3 col-md-6 col-sm-6 my-2 padright40' data-aos='fade-up' data-aos-duration='500'>
							<div className='footer-content-wrapper'>
								<div className='footer-sec-head mb-4'>
									<h4 className='footer-widget-title'>Instagram</h4>
								</div>
								<ul className='insta-feed'>
									<li className='foot-list'>
										<a href='https://www.instagram.com/' className='footer-link'>
											<img src='/img/instagram/1.png' alt='' />
										</a>
									</li>
									<li className='foot-list'>
										<a href='https://www.instagram.com/' className='footer-link'>
											<img src='/img/instagram/2.png' alt='' />
										</a>
									</li>
									<li className='foot-list'>
										<a href='https://www.instagram.com/' className='footer-link'>
											<img src='/img/instagram/3.png' alt='' />
										</a>
									</li>
									<li className='foot-list'>
										<a href='https://www.instagram.com/' className='footer-link'>
											<img src='/img/instagram/4.png' alt='' />
										</a>
									</li>
									<li className='foot-list'>
										<a href='https://www.instagram.com/' className='footer-link'>
											<img src='/img/instagram/5.png' alt='' />
										</a>
									</li>
									<li className='foot-list'>
										<a href='https://www.instagram.com/' className='footer-link'>
											<img src='/img/instagram/6.png' alt='' />
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div className='col-lg-3 col-md-6 col-sm-6 my-2' data-aos='fade-up' data-aos-duration='500'>
							<div className='footer-content-wrapper'>
								<div className='footer-sec-head mb-4'>
									<h4 className='footer-widget-title'>Let's talk</h4>
								</div>

								<p className='subscribe-des'>
									In case of any feedback, quick order, questions or updates, lets engage through <br />
									our social media handles.
								</p>
								<ul className='social-ul'>
									<li className='social-list'>
										<a href='#' className='social-link'>
											<span className='icofont-facebook'></span>
										</a>
									</li>

									<li className='social-list'>
										<a href='#' className='social-link'>
											<span className='icofont-twitter'></span>
										</a>
									</li>

									<li className='social-list'>
										<a href='#' className='social-link'>
											<span className='icofont-instagram'></span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className='last-footer'>
					<div className='container'>
						<div className='row'>
							<div className='text-center'>
								<p className='copyright-text'>© Copyright Cooking confessions {currentYear}. All Right Reserved.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterSection;
