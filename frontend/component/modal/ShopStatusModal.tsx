'use client';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Modal } from 'react-bootstrap';

const ShopStatusModal: React.FC = () => {
	const {
		showShopStatusModal,
		handleShopStatusModal,
		shopStatus,
	} = useAppContext();

	const router = useRouter();

	const handleContinue = () => {
		handleShopStatusModal();
		router.push('/checkout');
	};

	return (
		<Modal
			backdropClassName='lightbox-modal-backdrop'
			className='shop-status-modal'
			show={showShopStatusModal}
			onHide={handleShopStatusModal}
			size='lg'
			centered>
			<Modal.Body className='lightbox-modal-body'>
				<p>
					We are currently closed untill {shopStatus.opensAt}. Would you still
					like to place the order?
				</p>
				<div className='submit-button-sec d-flex justify-content-between mt-30'>
					<button
						className='custom-btn'
						onClick={() => handleShopStatusModal()}>
						No
					</button>
					<button
						onClick={() => handleContinue()}
						type='submit'
						className='custom-btn'>
						Yes, I'll wait
					</button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ShopStatusModal;
