'use client';
import { useAppContext } from '@/context/AppContext';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoginForm = () => {
	const {
		passwordVisible,
		togglePasswordVisibility,
		handleUserLogin,
	} = useAppContext();
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!username && !password) {
			toast.error('Please fill out all fields.', { position: 'top-right' });
		} else if (!password) {
			toast.warning('Please provide password.', { position: 'top-right' });
		} else if (!username) {
			toast.warning('Please provide user name.', { position: 'top-right' });
		} else {
			// If the form is successfully submitted, show a success toast
			setUserName('');
			setPassword('');
			handleUserLogin({ username, password });
		}
	};

	return (
		<form
			className='login-form login-form-login login'
			onSubmit={handleFormSubmit}>
			<p className='login-form-row login-form-row--wide form-row form-row-wide'>
				<label htmlFor='username'>
					Username or email address&nbsp;
					<span className='required'>*</span>
				</label>
				<input
					type='text'
					className='login-Input login-Input--text input-text'
					name='username'
					id='username'
					value={username}
					onChange={(e) => setUserName(e.target.value)}
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
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<span
						className='show-password-input'
						role='button'
						onClick={togglePasswordVisibility}></span>
				</span>
			</p>

			<p className='form-row row justify-content-center'>
				<label className='login-form__label login-form__label-for-checkbox login-form-login__rememberme'>
					<input
						className='login-form__input login-form__input-checkbox'
						name='rememberme'
						type='checkbox'
						id='rememberme'
						value='forever'
						readOnly
					/>{' '}
					<span>Remember me</span>
				</label>
				<button
					type='submit'
					className='login-button button login-form-login__submit wp-element-button col-md-2'
					name='login'
					value='Log in'>
					Log in
				</button>
			</p>
			<p className='login-LostPassword lost_password row justify-content-center col-md-3'>
				<a href='#'>Forgot password?</a>
			</p>
		</form>
	);
};

export default LoginForm;
