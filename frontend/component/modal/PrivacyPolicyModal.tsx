'use client';
import { useAppContext } from '@/context/AppContext';
import React from 'react';
import { Modal } from 'react-bootstrap';

const PrivacyPolicyModal: React.FC = () => {
	const {
		isLightBoxModalOpen,
		closeLightBoxModal,
		companyInfo,
	} = useAppContext();

	return (
		<Modal
			backdropClassName='lightbox-modal-backdrop'
			show={isLightBoxModalOpen}
			onHide={closeLightBoxModal}
			size='lg'
			centered>
			<Modal.Body className='lightbox-modal-body'>
				<div>
					<h4 className='sec-title text-center'>Our Privacy Policy</h4>

					<p>
						At Cooking Confessions, we take your privacy seriously. This Privacy
						Policy is designed to help you understand how we collect, use, and
						safeguard your personal information. By using our website or placing
						an online order, you consent to the practices described in this
						policy.
					</p>

					<h4 className='emphasized-title'>Information We Collect:</h4>
					<p>
						We collect and process the following types of personal information:
					</p>
					<ul>
						<li>
							<strong>Contact Information:</strong> When you place an online
							order, we collect your name, email address, phone number, and
							delivery address to ensure the successful processing and delivery
							of your order.
						</li>
						<li>
							<strong>Payment Details:</strong> To facilitate secure online
							transactions, we collect payment information, including credit
							card details and billing address.
						</li>
					</ul>

					<h4 className='emphasized-title'>How We Use Your Information:</h4>
					<p>We use the collected information for the following purposes:</p>
					<ul>
						<li>
							<strong>Order Processing:</strong> To process and fulfill your
							online orders, including order confirmation, delivery, and
							customer support.
						</li>
						<li>
							<strong>Payment Processing:</strong> To securely process your
							online payments and prevent fraudulent activities.
						</li>
						<li>
							<strong>Communication:</strong> To communicate with you about your
							orders, provide updates, and respond to your inquiries.
						</li>
					</ul>
					<h4 className='emphasized-title'>Changes to this Privacy Policy:</h4>
					<p>
						We may update our Privacy Policy from time to time. Any changes will
						be posted on this page, and the effective date will be updated
						accordingly.
					</p>

					<h4 className='emphasized-title'>Contact Us:</h4>
					<p>
						If you have any questions or concerns about our Privacy Policy,
						please contact us at{' '}
						<a href={`'mailto:'${companyInfo.email}`}>{companyInfo.email}</a>.
					</p>

					<p>Thank you for choosing {companyInfo.name}!</p>

					<p>
						<strong>
							{companyInfo.name}
							<br />
							{companyInfo.addressLine1}, {companyInfo.addressLine2}
							<br />
							{companyInfo.email}
						</strong>
					</p>

					<div className='submit-button-sec d-flex justify-content-between mt-30'>
						<button className='custom-btn' onClick={() => closeLightBoxModal()}>
							Close
						</button>
						<button
							onClick={() => closeLightBoxModal()}
							type='submit'
							className='custom-btn'>
							Ok, got it!
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default PrivacyPolicyModal;
