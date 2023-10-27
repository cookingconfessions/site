'use client';
import { LayoutProps } from '@/types/home';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import FooterSection from '../footer/FooterSection';
import Header from '../header/Header';
import BookCateringModal from '../modal/BookCateringModal';
import ContactModal from '../modal/ContactModal';
import LoginModal from '../modal/LoginModal';
import SearchModal from '../modal/SearchModal';
import SidebarSection from '../sidebar/SidebarSection';

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='wrapper theme-3'>
			<Header theme='theme-3' logo='img/logo/logo-3.png' />
			<SidebarSection logo='/img/logo/logo-3.png' />
			<div className='body-wrapper'>
				{children}
				<FooterSection style='footer-3' />
			</div>
			<SearchModal style='default' />
			<ToastContainer />
			<ContactModal />
			<LoginModal />
			<BookCateringModal />
		</div>
	);
};

export default Layout;
