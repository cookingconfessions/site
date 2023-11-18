'use client';
import { useAppContext } from '@/context/AppContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const UserLoginDropdown = () => {
	const { openLoginModal, isAuthenticated, user, logout } = useAppContext();
	return (
		<OverlayScrollbarsComponent className='cart-menu'>
			{isAuthenticated ? (
				<>
					<div className='commenter-img'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='40'
							height='40'
							fill='red'
							className='bi bi-person'
							viewBox='0 0 16 16'>
							<path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z' />
						</svg>
						<span className='pl-10'>{`${user?.firstName}  ${user?.lastName}`}</span>
					</div>
					<div className='cart-modal-btn'>
						<button onClick={logout} className='custom-btn'>
							Logout
						</button>
					</div>
				</>
			) : (
				<div className='cart-modal-btn'>
					<button onClick={openLoginModal} className='custom-btn'>
						Login
					</button>
				</div>
			)}
		</OverlayScrollbarsComponent>
	);
};

export default UserLoginDropdown;
