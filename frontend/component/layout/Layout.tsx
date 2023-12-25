import { LayoutProps } from '@/types/home';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import FooterSection from '../footer/FooterSection';
import Header from '../header/Header';
import BookCateringModal from '../modal/BookCateringModal';
import ContactModal from '../modal/ContactModal';
import LoginModal from '../modal/LoginModal';
import PrivacyPolicyModal from '../modal/PrivacyPolicyModal';
import ShopStatusModal from '../modal/ShopStatusModal';
import SidebarSection from '../sidebar/SidebarSection';

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='wrapper theme-3' suppressHydrationWarning={true}>
			<Header theme='theme-3' logo='img/logo/logo.png' />
			<SidebarSection logo='/img/logo/logo.png' />
			<div className='body-wrapper'>
				{children}
				<FooterSection style='footer-3' />
			</div>
			<ToastContainer />
			<ContactModal />
			<LoginModal />
			<BookCateringModal />
			<PrivacyPolicyModal />
			<ShopStatusModal />
		</div>
	);
};

export default Layout;
