'use client';
import { LayoutProps } from '@/types/home';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import FooterSection from '../footer/FooterSection';
import Header from '../header/Header';
import BookCateringModal from '../modal/BookCateringModal';
import ContactModal from '../modal/ContactModal';
import LoginModal from '../modal/LoginModal';
import ProductLightBoxModal from '../modal/ProductLightBoxModal';
import SidebarSection from '../sidebar/SidebarSection';

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='wrapper theme-3' suppressHydrationWarning={true}>
			<Header theme='theme-3' logo='img/logo/logo-3.png' />
			<SidebarSection logo='/img/logo/logo-3.png' />
			<div className='body-wrapper'>
				{children}
				<FooterSection style='footer-3' />
			</div>
			<ToastContainer />
			<ContactModal />
			<LoginModal />
			<BookCateringModal />
			<ProductLightBoxModal />
		</div>
	);
};

export default Layout;
