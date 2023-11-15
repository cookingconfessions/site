import { useAppContext } from '@/context/AppContext';
import { ReviewFormElements } from '@/types/form';
import {
	CreateMenuItemReview,
	MenuItemReview,
	ShopDetailsProp,
} from '@/types/menu';
import React, { FormEvent } from 'react';
import ShopReviewForm from './ShopReviewForm';

interface ReviewTreeProps {
	reviews: MenuItemReview[];
}

const renderReviewTree = (
	reviews: MenuItemReview[],
	replyCallback: () => void
) => {
	if (!reviews) {
		return null;
	}

	return (
		<>
			{reviews.map((review) => (
				<div className='single-comment mb-5'>
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
					</div>
					<div className='comment'>
						<h4 className='commenter-name'>{review.name}</h4>
						<div className='date-reply'>
							<p className='comment-date'>{review.createdAt}</p>
						</div>
						<p
							className={`'comment-content' ${
								review.replies.length > 0 ? 'mb-5' : ''
							}`}>
							{review.message}
						</p>
						{review.replies.length > 0 && (
							<div style={{ marginLeft: '5px' }}>
								{renderReviewTree(review.replies, replyCallback)}
							</div>
						)}
					</div>
				</div>
			))}
		</>
	);
};

const ShopReviewPane: React.FC<ShopDetailsProp> = ({ shopData }) => {
	const { customer, submitReview, handleOpenReviewModal } = useAppContext();

	const handleReviewSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const elements = (event.target as HTMLFormElement)
			.elements as ReviewFormElements;

		const review: CreateMenuItemReview = {
			name: elements.name.value,
			email: elements.email.value,
			message: elements.message.value,
			menuItem: shopData.id,
		};

		submitReview(review);
	};

	return (
		<div className='product-review p-0'>
			<div className='review-head'>
				<h4 className='customer-review-title'>Customer Reviews</h4>

				<div className='user-review'>
					<div className='review-list'>
						<div className='col-md-8'>
							<div className='comment-section'>
								{renderReviewTree(shopData.reviews, handleOpenReviewModal)}
							</div>
							<div className='comment-form'>
								<h3 className='comment-form-title'>Leave A Comment</h3>
								<ShopReviewForm shopData={shopData} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopReviewPane;
