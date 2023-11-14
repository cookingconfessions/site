'use client';
import { useAppContext } from '@/context/AppContext';
import { ContactFormElements } from '@/types/form';
import { Message } from '@/types/home';
import React, { FormEvent } from 'react';
import { Modal } from 'react-bootstrap';

const ContactModal: React.FC = () => {
	const {
		isContactModalOpen,
		closeContactModal,
		handleContactFormSubmit,
	} = useAppContext();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const elements: ContactFormElements = (event.target as HTMLFormElement)
			.elements as ContactFormElements;
		const message: Message = {
			name: elements.name.value,
			email: elements.email.value,
			phoneNumber: elements.phoneNumber.value,
			location: elements.location.value,
			message: elements.message.value,
		};
		handleContactFormSubmit(message);
	};

	return (
		<Modal
			backdropClassName='lightbox-modal-backdrop'
			className='product-quick-view-modal'
			show={isContactModalOpen}
			onHide={closeContactModal}
			size='lg'
			centered>
			<Modal.Body className='lightbox-modal-body'>
				<div
					className='contact cpy-6'
					data-aos='fade-up'
					data-aos-duration='1000'>
					<div className='container'>
						<div className='form-wrapper inner'>
							<div className='form-inside'>
								<div
									className='form-head'
									data-aos='fade-up'
									data-aos-duration='1000'>
									<div className='section-head text-center'>
										<span className='sm-title theme-3'>Contact Us</span>
										<h2 className='sec-title'>Get In Touch</h2>
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
															name='name'
															required
															className='form-control'
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
															name='email'
															required
															className='form-control'
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
													Send Message
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

export default ContactModal;
