'use client';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import React from 'react';
import MobileNavigationSection from '../navigation/MobileNavigationSection';
interface SidebarProps {
	logo: string;
}
const SidebarSection: React.FC<SidebarProps> = ({ logo }) => {
	const {
		isSidebarOpen,
		closeSidebar,
		cartItemAmount,
		companyInfo,
	} = useAppContext();

	return (
		<>
			<div
				className={`dr-sidebar-info side-info ${
					isSidebarOpen ? 'info-open' : ''
				}`}>
				<div className='dr-sidebar-logo-wrapper mb-25'>
					<div className='row align-items-center'>
						<div className='col-xl-6 col-8'>
							<div className='dr-sidebar-logo'>
								<Link href='/'>
									<img src={logo} alt='logo-img' />
								</Link>
							</div>
						</div>
						<div className='col-xl-6 col-4'>
							<div className='dr-sidebar-close-wrapper text-end'>
								<button
									className='dr-sidebar-close side-info-close'
									onClick={closeSidebar}>
									<i className='icofont-close-line'></i>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='dr-sidebar-menu-wrapper fix'>
					<div className='cf-header-menu mean-container'>
						<MobileNavigationSection />
					</div>
				</div>

				<div className='dr-sidebar-btn-wrap mt-40'>
					<Link href='/cart'>
						<span className='icofont-shopping-cart'>
							<span className='cart-count'>{cartItemAmount}</span>
						</span>
					</Link>
				</div>

				<div className='dr-sidebar-contact-wrapper mt-40'>
					<div className='dr-sidebar-contact mb-40'>
						<h4 className='dr-sidebar-contact-title'>Contact Info</h4>
						<span className='sidebar-address'>
							<i className='icofont-google-map'></i>
							<span>{`${companyInfo.addressLine1}, ${companyInfo.addressLine2}`}</span>{' '}
						</span>
						<a href='tel:+1(251)410-1010'>
							<i className='icofont-phone'></i>
							<span>{companyInfo.phoneNumbers.split(',')[0]}</span>
						</a>
						<a href='mailto:example@gmail.com' className='theme-3'>
							<i className='icofont-envelope-open'></i>
							<span>
								<span>{companyInfo.email}</span>
							</span>
						</a>
					</div>

					<div className='dr-sidebar-social mt-40 mb-30'>
						<a href='#' className='facebook'>
							<i className='fab fa-facebook-f'></i>
						</a>
						<a href='#' className='twitter'>
							<i className='fab fa-twitter'></i>
						</a>
						<a href='#' className='linkedin'>
							<i className='fab fa-linkedin-in'></i>
						</a>
						<a href='#' className='youtube'>
							<i className='fab fa-dribbble'></i>
						</a>
					</div>
				</div>
			</div>
			<div
				className={`offcanvas-overlay ${isSidebarOpen ? 'overlay-open' : ''}`}
				role='button'
				onClick={closeSidebar}></div>
		</>
	);
};

export default SidebarSection;
