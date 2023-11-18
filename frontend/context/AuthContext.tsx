import { LoginDetails } from '@/types/auth';
import { AuthContextData } from '@/types/context';
import { Customer } from '@/types/menu';
import { useApiClient } from '@/utils/api-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useAuthContext = (): AuthContextData => {
	const router = useRouter();

	// Password visibility
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// Login modal
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

	const openLoginModal = () => {
		setIsLoginModalOpen(true);
	};
	const closeLoginModal = () => {
		setIsLoginModalOpen(false);
	};
	const handleUserLogin = (loginDetails: LoginDetails) => {
		useApiClient()
			.login(loginDetails)
			.then((response) => {
				if (response.access) {
					localStorage.setItem('token', JSON.stringify(response));
					toast.success('Successfully logged in.');
					setIsAuthenticated(true);
					closeLoginModal();
				}
			})
			.catch((_error) => {
				toast.error('Invalid username or password.');
			});
	};

	// Authenticated user
	const [user, setUser] = useState<Customer>();

	useEffect(() => {
		if (isAuthenticated && !user) {
			useApiClient()
				.getCustomer()
				.then((response) => {
					setUser(response);
					localStorage.setItem('customer', JSON.stringify(response));
				});

			return;
		}

		if (!isAuthenticated) {
			setUser(undefined);
			localStorage.removeItem('customer');
		}
	}, [isAuthenticated]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	const logout = () => {
		useApiClient()
			.logout()
			.then(() => {
				setIsAuthenticated(false);
				localStorage.removeItem('token');
				router.push('/');
				toast.success('Successfully logged out.');
			})
			.catch((_error) => {
				toast.error('There was a problem signing you out.');
			});
	};

	return {
		user,
		isAuthenticated,
		passwordVisible,
		togglePasswordVisibility,
		isLoginModalOpen,
		openLoginModal,
		closeLoginModal,
		handleUserLogin,
		logout,
	};
};
