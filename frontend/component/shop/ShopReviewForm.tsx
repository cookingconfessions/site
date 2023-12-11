import { useAppContext } from '@/context/AppContext';
import { ReviewFormElements } from '@/types/form';
import { CreateMenuItemReview, ShopDetailsProp } from '@/types/menu';
import { FormEvent } from 'react';

const ShopReviewForm: React.FC<ShopDetailsProp> = ({ shopData }) => {
	const { customer, submitReview, isAuthenticated } = useAppContext();

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

		submitReview(shopData.slug, review);
		(event.target as HTMLFormElement).reset();
	};

	return (
		<div className='form'>
			<form action='#' onSubmit={handleReviewSubmit}>
				<div className='row'>
					<div
						className={`col-sm-6 mb-30 ${
							isAuthenticated ? 'display-none' : ''
						}`}>
						<input
							type='text'
							className='form-control'
							name='name'
							defaultValue={customer.firstName}
							placeholder='Name'
						/>
					</div>
					<div
						className={`col-sm-6 mb-30 ${
							isAuthenticated ? 'display-none' : ''
						}`}>
						<input
							type='email'
							name='email'
							className='form-control'
							defaultValue={customer.email}
							placeholder='Email'
						/>
					</div>
					<div className='col-sm-6 mb-30'>
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
	);
};

export default ShopReviewForm;
