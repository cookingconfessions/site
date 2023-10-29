'use client';
import { useCafeuContext } from '@/context/CafeuContext';
import React from 'react';
import { Modal } from 'react-bootstrap';

const BookCateringModal: React.FC = () => {
	const { isBookingModalOpen, closeBookingModal } = useCafeuContext();

	return (
		<Modal
			backdropClassName='lightbox-modal-backdrop'
			className='product-quick-view-modal'
			show={isBookingModalOpen}
			onHide={closeBookingModal}
			size='lg'
			centered>
			<Modal.Body className='lightbox-modal-body'>
				<div className='contact cpy-6' data-aos='fade-up' data-aos-duration='1000'>
					<div className='container'>
						<div className='form-wrapper inner'>
							<div className='form-inside'>
								<div className='form-head' data-aos='fade-up' data-aos-duration='1000'>
									<div className='section-head text-center'>
										<span className='sm-title theme-3'>Catering Booking</span>
										<h2 className='sec-title'>Cook with us</h2>
									</div>
								</div>
								<div className='row'>
									<div className='contact-form pt-15' data-aos='fade-up' data-aos-duration='1500'>
										<form action='mail.php' method='post' id='contact-message'>
											<div className='row'>
												<div className='col-md-6'>
													<div className='input-group flex-nowrap mb-30'>
														<input type='text' className='form-control' placeholder='Your Name *' />
														<span className='right-input-icon'>
															<i className='icofont-ui-user'></i>
														</span>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='input-group flex-nowrap mb-30'>
														<input type='email' className='form-control' placeholder='Your Email *' />
														<span className='right-input-icon'>
															<i className='icofont-email'></i>
														</span>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='input-group flex-nowrap mb-30'>
														<input type='text' className='form-control' placeholder='Your Phone *' />
														<span className='right-input-icon'>
															<i className='icofont-phone'></i>
														</span>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='input-group flex-nowrap mb-30'>
														<input type='text' className='form-control' placeholder='Your Location *' />
														<span className='right-input-icon'>
															<i className='icofont-location-pin'></i>
														</span>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='input-group flex-nowrap mb-30'>
														<input type='date' name='eventDate' className='form-control' placeholder='Event date *' />
													</div>
												</div>
												<div className='col-md-6'>
													<div className='input-group flex-nowrap mb-30'>
														<input type='time' name='eventDate' className='form-control' placeholder='Time *' />
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
											<div className='submit-button-sec mt-30'>
												<button type='submit' className='custom-btn'>
													Book
												</button>
											</div>
										</form>
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

export default BookCateringModal;