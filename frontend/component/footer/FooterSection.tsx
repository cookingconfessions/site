'use client';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import React from 'react';
interface FooterProp {
	style: string;
}
const FooterSection: React.FC<FooterProp> = ({ style }) => {
	const { currentYear, companyInfo, menuItems } = useAppContext();
	const phone_numbers: string[] = companyInfo.phoneNumbers.split(',');

	return (
		<footer>
			<div
				className={`footer-section ${style}`}
				data-background='/img/footer-bg.png'>
				<div className='container'>
					<div className='row'>
						<div
							className='col-lg-3 col-md-6 col-sm-6 my-2 smpadright40'
							data-aos='fade-up'
							data-aos-duration='500'>
							<div className='footer-content-wrapper'>
								<div className='footer-logo mb-4'>
									<img src='/img/logo/logo-white.png' alt='' />
								</div>
								<p> {companyInfo.description}</p>
								<ul className='address'>
									<li>
										<span className='icofont-location-pin'></span>
										<p className='address-info'>{`${companyInfo.addressLine1}, ${companyInfo.addressLine2}`}</p>
									</li>

									<li>
										<span className='icofont-email'></span>
										<div className='address-inner'>
											<p className='address-info'>
												<a href='mailto:nfo@example.com'>{companyInfo.email}</a>
											</p>
										</div>
									</li>

									<li>
										<span className='icofont-ui-call'> </span>
										<div className='address-inner'>
											{phone_numbers.map((num) => (
												<p className='address-info' key={num}>
													{' '}
													{num}
													<a href='tel:+123456679123'></a>
												</p>
											))}
										</div>
									</li>
								</ul>
							</div>
						</div>

						<div
							className='col-lg-3 col-md-6 col-sm-6 my-2 padleft40'
							data-aos='fade-up'
							data-aos-duration='500'>
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

						<div
							className='col-lg-3 col-md-6 col-sm-6 my-2 padright40'
							data-aos='fade-up'
							data-aos-duration='500'>
							<div className='footer-content-wrapper'>
								<div className='footer-sec-head mb-4'>
									<h4 className='footer-widget-title'>Instagram</h4>
								</div>
								<ul className='insta-feed'>
									{menuItems.slice(0, 5).map((item) => (
										<li key={item.id} className='foot-list'>
											<a
												href={companyInfo.instagramLink}
												className='footer-link'>
												<img src={item.image} alt='' />
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div
							className='col-lg-3 col-md-6 col-sm-6 my-2'
							data-aos='fade-up'
							data-aos-duration='500'>
							<div className='footer-content-wrapper'>
								<div className='footer-sec-head mb-4'>
									<h4 className='footer-widget-title'>Let's talk</h4>
								</div>

								<p className='subscribe-des'>
									In case of any feedback, questions or updates, let's engage
									through <br />
									our social media handles.
								</p>
								<ul className='social-ul'>
									<li className='social-list'>
										<a href={companyInfo.facebookLink} className='social-link'>
											<span className='icofont-facebook'></span>
										</a>
									</li>

									<li className='social-list'>
										<a href={companyInfo.instagramLink} className='social-link'>
											<span className='icofont-instagram'></span>
										</a>
									</li>

									<li className='social-list'>
										<a href={companyInfo.tiktokLink} className='social-link'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='16'
												height='16'
												fill='currentColor'
												className='bi bi-tiktok'
												viewBox='0 0 16 16'>
												<path d='M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z' />
											</svg>
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
								<p className='copyright-text'>
									© Copyright {companyInfo.name} {currentYear}. All Right
									Reserved.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterSection;
