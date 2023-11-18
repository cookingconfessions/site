'use client';
import { useAppContext } from '@/context/AppContext';
import { PasswordResetFormElements } from '@/types/form';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

const PasswordResetForm = () => {
	const {
		passwordVisible,
		togglePasswordVisibility,
		handleUserLogin,
	} = useAppContext();
	const [email, setEmail] = useState('');

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const elements = (event.target as HTMLFormElement)
			.elements as PasswordResetFormElements;

		if (!elements.email && !elements.password && !elements.confirmPassword) {
			toast.error('Please fill out all fields.', { position: 'top-right' });
		} else if (!elements.password) {
			toast.warning('Please provide password.', { position: 'top-right' });
		} else if (!elements.confirmPassword) {
			toast.warning('Please provide password confirmation.', {
				position: 'top-right',
			});
		} else if (elements.password !== elements.confirmPassword) {
			toast.warning('Passwords do not match.', { position: 'top-right' });
		} else {
			// If the form is successfully submitted, show a success toast
			handleUserLogin({
				username: elements.email.value.split('@')[0],
				password: elements.password.value,
			});
		}
	};

	return (
		<form
			className='login-form login-form-login login'
			onSubmit={handleFormSubmit}>
			<p className='login-form-row login-form-row--wide form-row form-row-wide'>
				<label htmlFor='username'>
					Email address&nbsp;
					<span className='required'>*</span>
				</label>
				<input
					type='text'
					className='login-Input login-Input--text input-text'
					name='email'
					id='username'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</p>
			<p className='login-form-row login-form-row--wide form-row form-row-wide'>
				<label htmlFor='password'>
					Password&nbsp;
					<span className='required'>*</span>
				</label>
				<span className='password-input'>
					<input
						className='login-Input login-Input--text input-text'
						type={passwordVisible ? 'text' : 'password'}
						name='password'
						id='password'
						autoComplete='current-password'
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
						name='password'
						id='password'
						autoComplete='current-password'
					/>
					<span
						className='show-password-input'
						role='button'
						onClick={togglePasswordVisibility}></span>
				</span>
			</p>

			<p className='form-row row justify-content-center'>
				<button
					type='submit'
					className='login-button button login-form-login__submit wp-element-button col-md-2'
					name='submit'
					value='Sumbit'>
					Reset Password
				</button>
			</p>
		</form>
	);
};

export default PasswordResetForm;
