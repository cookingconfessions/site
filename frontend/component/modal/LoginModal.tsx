'use client';
import { useAppContext } from '@/context/AppContext';
import React from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from '../auth/LoginForm';

const LoginModal: React.FC = () => {
	const { isLoginModalOpen, closeLoginModal } = useAppContext();

	return (
		<Modal
			backdropClassName='lightbox-modal-backdrop'
			className='product-quick-view-modal'
			show={isLoginModalOpen}
			onHide={closeLoginModal}
			size='lg'
			centered>
			<Modal.Body className='lightbox-modal-body'>
				<div className='container'>
					<div className='row'>
						<div className='col-xl-12'>
							<div className='cafeu-page-content'>
								<div className='post-entry post-entry--top-margin'>
									<div className='login'>
										<div className='login-notices-wrapper'></div>

										<h2 className='sec-title'>Login</h2>

										<LoginForm />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
