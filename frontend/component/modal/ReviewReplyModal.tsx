'use client';
import { useAppContext } from '@/context/AppContext';
import React from 'react';
import { Modal } from 'react-bootstrap';

const ReviewReplyModal: React.FC = () => {
	const { isReviewModalOpen, handleOpenReviewModal } = useAppContext();

	return (
		<Modal
			backdropClassName='lightbox-modal-backdrop'
			className='product-quick-view-modal'
			show={isReviewModalOpen}
			onHide={handleOpenReviewModal}
			size='lg'
			centered>
			<Modal.Body className='lightbox-modal-body'>
				{/* <ShopReviewForm/> */}
			</Modal.Body>
		</Modal>
	);
};

export default ReviewReplyModal;
