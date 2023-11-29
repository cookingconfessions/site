'use client';
import { useAppContext } from '@/context/AppContext';
import { HeaderProp } from '@/types/home';
import Link from 'next/link';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import React from 'react';
import DropdownCartSection from '../cart/DropdownCartSection';
import UserLoginDropdown from '../login/UserLoginDropdown';
import NavigationSection from '../navigation/NavigationSection';

const Header: React.FC<HeaderProp> = ({ logo, theme }) => {
	const { isHeaderFixed, cartItemAmount, openSidebar } = useAppContext();

	return (
		<header>
			<GoogleAnalytics trackPageViews />
			<div
				className={`header header-2 ${theme} ${
					isHeaderFixed ? 'navbar-fixed' : ''
				}`}>
				<div className='container'>
					<div className='header-inner second-home-nav'>
						<div className='logo'>
							<Link href='/'>
								<img
									src={`/${logo}`}
									alt='Logo not found'
									className='logo-img'
								/>{' '}
								<span className='sm-title'>Cooking Confessions</span>
							</Link>
						</div>
						<div className='header-right'>
							<div className='header-menu d-none d-lg-block'>
								<NavigationSection />
							</div>
							<div className='right-menu-icon'>
								<ul className='d-flex align-items-center'>
									<li className='nav-list'>
										<a className='nav-link icon-item'>
											<span className='icofont-shopping-cart'>
												{' '}
												<span className='cart-count'>{cartItemAmount}</span>
											</span>
										</a>
										<DropdownCartSection />
									</li>
									<li className='nav-list'>
										<div className='nav-link icon-item'>
											<span className='icofont-ui-user'></span>
										</div>
										<UserLoginDropdown />
									</li>
								</ul>
							</div>
							<div className='d-lg-none dr-navbar-mobile-sign side-toggle'>
								<div className='dr-navbar-sign menu-tab' onClick={openSidebar}>
									<span className='dr-line-1'></span>
									<span className='dr-line-2'></span>
									<span className='dr-line-3'></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
