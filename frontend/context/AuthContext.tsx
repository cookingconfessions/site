import { LoginDetails } from '@/types/auth';
import { useState } from 'react';

export interface AuthContextData {
	passwordVisible: boolean;
	togglePasswordVisibility: () => void;
	isLoginModalOpen: boolean;
	openLoginModal: () => void;
	closeLoginModal: () => void;
	handleUserLogin: (loginDetails: LoginDetails) => void;
}

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
