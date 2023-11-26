'use client';
import { useAppContext } from '@/context/AppContext';
import { PasswordResetFormElements } from '@/types/form';
import { useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';

const PasswordResetForm = () => {
	const {
		passwordVisible,
		togglePasswordVisibility,
		resetPassword,
		passwordResetErrors,
		clearPasswordResetErrors,
	} = useAppContext();

	const params = useSearchParams();
	const token = params.get('token');

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const elements = (event.target as HTMLFormElement)
			.elements as PasswordResetFormElements;

		if (!token) {
			return toast.warning('Missing password reset token.', {
				position: 'top-right',
			});
		}

		if (elements.password.value !== elements.confirmPassword.value) {
			toast.error('Passwords do not match.', { position: 'top-right' });
		} else {
			resetPassword(elements.password.value, token);
		}
	};

	return (
		<div className='container'>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<form
						className='login-form login-form-login login'
						onSubmit={handleFormSubmit}
						onChange={() =>
							passwordResetErrors.length ? clearPasswordResetErrors() : ''
						}>
						<h4>Set Password</h4>

						<p className='mt-10 login-form-row login-form-row--wide form-row form-row-wide'>
							<label htmlFor='password'>
								Password&nbsp;
								<span className='required'>*</span>
							</label>
							<span className='password-input'>
								<input
									className='login-Input login-Input--text input-text'
									type={passwordVisible ? 'text' : 'password'}
									name='password'
									style={{
										borderColor: passwordResetErrors.length ? 'red' : '#f2f2f2',
									}}
								/>
								<span
									className='show-password-input'
									role='button'
									onClick={togglePasswordVisibility}></span>
							</span>
						</p>

						<p className='login-form-row login-form-row--wide form-row form-row-wide'>
							<label htmlFor='password'>
								Confirm Password&nbsp;
								<span className='required'>*</span>
							</label>
							<span className='password-input'>
								<input
									className='login-Input login-Input--text input-text'
									type={passwordVisible ? 'text' : 'password'}
									name='confirmPassword'
									style={{
										borderColor: passwordResetErrors.length ? 'red' : '#f2f2f2',
									}}
								/>
								<span
									className='show-password-input'
									role='button'
									onClick={togglePasswordVisibility}></span>
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

export default PasswordResetForm;
