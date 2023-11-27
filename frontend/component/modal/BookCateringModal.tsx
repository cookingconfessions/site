'use client';
import { useAppContext } from '@/context/AppContext';
import { BookingFormElements } from '@/types/form';
import { Booking } from '@/types/home';
import React, { FormEvent } from 'react';
import { Modal } from 'react-bootstrap';

const BookCateringModal: React.FC = () => {
	const {
		isBookingModalOpen,
		closeBookingModal,
		handleBookingFormSubmit,
		clearBookingErrors,
		bookingErrors,
	} = useAppContext();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const elements = (event.target as HTMLFormElement)
			.elements as BookingFormElements;
		const booking: Booking = {
			name: elements.name.value,
			email: elements.email.value,
			phoneNumber: elements.phoneNumber.value,
			location: elements.location.value,
			date: elements.date.value,
			time: elements.time.value,
			message: elements.message.value,
		};
		handleBookingFormSubmit(booking);
	};

	return (
		<Modal
			backdropClassName='lightbox-modal-backdrop'
			className='product-quick-view-modal'
			show={isBookingModalOpen}
			onHide={closeBookingModal}
			size='lg'
			centered>
			<Modal.Body className='lightbox-modal-body'>
				<div className='container form-inside'>
					<div
						className='form-head'
						data-aos='fade-up'
						data-aos-duration='1000'>
						<div className='section-head text-center'>
							<span className='sm-title theme-3'>Catering Booking</span>
							<h2 className='sec-title'>Cook with us</h2>
						</div>
					</div>
					<div className='row'>
						<div
							className='contact-form pt-15'
							data-aos='fade-up'
							data-aos-duration='1500'>
							<form onSubmit={handleSubmit} id='contact-message'>
								<div className='row'>
									<div className='col-md-6'>
										<div className='input-group flex-nowrap mb-30'>
											<input
												type='text'
												className='form-control'
												name='name'
												required
												placeholder='Your Name *'
											/>
											<span className='right-input-icon'>
												<i className='icofont-ui-user'></i>
											</span>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='input-group flex-nowrap mb-30'>
											<input
												type='email'
												className='form-control'
												name='email'
												required
												placeholder='Your Email *'
											/>
											<span className='right-input-icon'>
												<i className='icofont-email'></i>
											</span>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='input-group flex-nowrap mb-30'>
											<input
												type='text'
												name='phoneNumber'
												required
												className='form-control'
												placeholder='Your Phone *'
											/>
											<span className='right-input-icon'>
												<i className='icofont-phone'></i>
											</span>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='input-group flex-nowrap mb-30'>
											<input
												type='text'
												name='location'
												required
												className='form-control'
												placeholder='Your Location *'
											/>
											<span className='right-input-icon'>
												<i className='icofont-location-pin'></i>
											</span>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='input-group flex-nowrap mb-30'>
											<input
												placeholder='Date *'
												type='text'
												name='date'
												onFocus={(event) => (event.target.type = 'date')}
												onBlur={(event) => (event.target.type = 'text')}
												required
												className='form-control'
												style={{
													borderColor: bookingErrors.length ? 'red' : '',
												}}
											/>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='input-group flex-nowrap mb-30'>
											<input
												placeholder='Time *'
												type='text'
												name='time'
												onFocus={(event) => (event.target.type = 'time')}
												onBlur={(event) => (event.target.type = 'text')}
												required
												className='form-control'
											/>
										</div>
									</div>
									<div className='col-md-12'>
										<textarea
											name='message'
											className='form-control'
											placeholder='Confess, we are listening...*'
											rows={5}></textarea>
									</div>
								</div>

								<div className='validation-errors'>
									{bookingErrors.length > 0 &&
										bookingErrors.map((error, index) => (
											<p key={index}>{error}</p>
										))}
								</div>

								<div className='submit-button-sec d-flex justify-content-between mt-30'>
									<button
										className='custom-btn'
										onClick={() => closeBookingModal()}>
										Cancel
									</button>
									<button type='submit' className='custom-btn'>
										Book
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default BookCateringModal;
