'use client';
import { useCafeuContext } from '@/context/CafeuContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const UserLoginDropdown = () => {
	const { openLoginModal } = useCafeuContext();
	return (
		<OverlayScrollbarsComponent className='cart-menu'>
			<p className='mt-10 pl-25'>Logged in as Myke Testing</p>
			<div className='cart-modal-btn'>
				<button onClick={openLoginModal} className='custom-btn'>
					Logout
				</button>
			</div>
		</OverlayScrollbarsComponent>
	);
};

export default UserLoginDropdown;
