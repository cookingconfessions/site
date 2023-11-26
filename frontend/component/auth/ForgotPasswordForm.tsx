'use client';
import { useAppContext } from '@/context/AppContext';
import { ForgotPassswordFormElements } from '@/types/form';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import ResetPasswordSuccess from './PasswordResetSuccess';

const ForgotPassswordForm = () => {
	const {
		sendPasswordResetEmail,
		passwordResetErrors,
		clearPasswordResetErrors,
		passwordResetRequestSent,
	} = useAppContext();

	const [isFormValid, setIsFormValid] = useState(true);

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const elements = (event.target as HTMLFormElement)
			.elements as ForgotPassswordFormElements;

		if (!elements.email.value) {
			setIsFormValid(false);
			toast.error('Please enter your email address.', {});
		} else {
			sendPasswordResetEmail(elements.email.value);
		}
	};

	const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const isFormValid = (event.target as HTMLFormElement).checkValidity();

		if (isFormValid) {
			clearPasswordResetErrors();
		}

		setIsFormValid(isFormValid);
	};

	return passwordResetRequestSent ? (
		<ResetPasswordSuccess />
	) : (
		<div className='container'>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<form
						className='login-form login-form-login login'
						onSubmit={handleFormSubmit}
						onChange={handleFormChange}>
						<h4>Reset Password</h4>

						<p className='mt-10 login-form-row login-form-row--wide form-row form-row-wide'>
							<label htmlFor='password'>
								Your email address&nbsp;
								<span className='required'>*</span>
							</label>
							<span>
								<input
									className='login-Input login-Input--text input-text'
									name='email'
									required
									type='email'
									style={{
										borderColor: !isFormValid ? 'red' : '#f2f2f2',
									}}
								/>
							</span>
						</p>

						<div className='password-errors'>
							{passwordResetErrors.length > 0 &&
								passwordResetErrors.map((error, index) => (
									<p key={index}>{error}</p>
								))}
						</div>

						<p className='d-flex justify-content-center'>
							<button
								type='submit'
								className='login-button button login-form-login__submit wp-element-button col-md-2'
								name='submit'
								value='Sumbit'>
								Submit
							</button>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassswordForm;
