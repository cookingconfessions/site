import { MenuItemReview, ShopDetailsProp } from '@/types/menu';
import React from 'react';

interface ReviewTreeProps {
	reviews: MenuItemReview[];
}

const renderReviewTree = (reviews: MenuItemReview[]) => {
	if (!reviews) {
		return null;
	}

	return (
		<>
			{reviews.map((review) => (
				<div className='single-comment mb-5'>
					<div className='commenter-img'>
						<img src='/img/customer/3.png' alt='' />
					</div>
					<div className='comment'>
						<h4 className='commenter-name'>{review.name}</h4>
						<div className='date-reply'>
							<p className='comment-date'>{review.createdAt}</p>
							<a href='' className='reply-btn'>
								Reply
							</a>
						</div>
						<p className={`'comment-content' ${review.replies.length > 0 ? 'mb-5' : ''}`}>{review.message}</p>
						{review.replies.length > 0 && <div style={{ marginLeft: '5px' }}>{renderReviewTree(review.replies)}</div>}
					</div>
				</div>
			))}
		</>
	);
};

const ShopReviewPane: React.FC<ShopDetailsProp> = ({ shopData }) => {
	return (
		<div className='product-review p-0'>
			<div className='review-head'>
				<h4 className='customer-review-title'>Customer Reviews</h4>

				<div className='user-review'>
					<div className='review-list'>
						<div className='col-md-8'>
							<div className='comment-section'>{renderReviewTree(shopData.reviews)}</div>
							<div className='comment-form'>
								<h3 className='comment-form-title'>Leave A Comment</h3>
								<div className='form'>
									<form action='#'>
										<div className='row'>
											<div className='col-sm-6 mb-30'>
												<input type='text' className='form-control' placeholder='Name' />
											</div>
											<div className='col-sm-6 mb-30'>
												<input type='email' className='form-control' placeholder='Email' />
											</div>
											<div className='col-md-12 mb-30'>
												<textarea
													name='message'
													id='message'
													className='form-control'
													rows={5}
													placeholder='Message'></textarea>
											</div>
											<div className='col-12'>
												<button type='submit' id='alert' className='custom-btn'>
													Submit Comment
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopReviewPane;
