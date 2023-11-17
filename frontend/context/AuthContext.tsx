import { LoginDetails } from '@/types/auth';
import { AuthContextData } from '@/types/context';
import { useState } from 'react';

export const useAuthContext = (): AuthContextData => {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
	const [loginDetails, setLoginDetails] = useState<LoginDetails | null>(null);

	const openLoginModal = () => {
		setIsLoginModalOpen(true);
	};
	const closeLoginModal = () => {
		setIsLoginModalOpen(false);
	};
	const handleUserLogin = (loginDetails: LoginDetails) => {
		setLoginDetails(loginDetails);
	};

	// Password visibility
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	return {
		passwordVisible,
		togglePasswordVisibility,
		isLoginModalOpen,
		openLoginModal,
		closeLoginModal,
		handleUserLogin,
	};
};
