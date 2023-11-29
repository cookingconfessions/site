'use client';
import { useAppContext } from '@/context/AppContext';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoginForm = () => {
	const {
		passwordVisible,
		togglePasswordVisibility,
		handleUserLogin,
		closeLoginModal,
	} = useAppContext();

	const [username, setUserName] = useState('');
	const [userNameInput, setUserNameInput] = useState('');
	const [password, setPassword] = useState('');

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!username && !password) {
			return;
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

	const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserNameInput(e.target.value);

		let userNameInput = e.target.value;

		if (userNameInput.split('@').length > 1) {
			userNameInput = userNameInput.split('@')[0];
		}

		setUserName(userNameInput);
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
					type='email'
					className='login-Input login-Input--text input-text'
					name='username'
					value={userNameInput}
					onChange={handleUserNameChange}
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
			</p>
			<p
				className='login-LostPassword lost_password row justify-content-center col-md-3'
				onClick={() => closeLoginModal()}>
				<a href='/forgot-password'>Forgot password?</a>
			</p>
			<div className='submit-button-sec d-flex justify-content-between mt-30'>
				<button className='custom-btn' onClick={() => closeLoginModal()}>
					Cancel
				</button>
				<button type='submit' className='custom-btn'>
					Log in
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
