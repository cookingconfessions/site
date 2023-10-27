'use client';
import { useCafeuContext } from '@/context/CafeuContext';
import React from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from '../form/LoginForm';

const LoginModal: React.FC = () => {
	const { isLoginModalOpen, closeLoginModal } = useCafeuContext();

	return (
		<Modal
			backdropClassName='lightbox-modal-backdrop'
			className='product-quick-view-modal'
			show={isLoginModalOpen}
			onHide={closeLoginModal}
			size='lg'
			centered>
			<Modal.Body className='lightbox-modal-body'>
				<div className='contact cpy-6' data-aos='fade-up' data-aos-duration='1000'>
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
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
