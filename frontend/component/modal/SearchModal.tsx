'use client';
import { useCafeuContext } from '@/context/CafeuContext';
import React from 'react';
import { Modal } from 'react-bootstrap';

interface SearchModalProps {
	style: string;
}
const SearchModal: React.FC<SearchModalProps> = ({ style }) => {
	const { isSearchbarModalOpen, closeSearchbarModal } = useCafeuContext();
	return (
		<Modal
			size='xl'
			show={isSearchbarModalOpen}
			onHide={closeSearchbarModal}
			backdropClassName='search-modal-backdrop'
			centered>
			<Modal.Body className={`searchbar-modal-body ${style}`}>
				<div className='searchbar-input'>
					<input type='search' placeholder='What are you searching for?' className='searchbar-form' />
					<button className='searchbar-btn' onClick={closeSearchbarModal}>
						Search
					</button>
					<div>
						<p>Results...</p>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default SearchModal;
