import { LayoutProps } from '@/types/home';
import { CheckoutProvider } from './CheckoutContext';

const CheckoutWrapper: React.FC<LayoutProps> = ({ children }) => {
	return <CheckoutProvider>{children}</CheckoutProvider>;
};

export default CheckoutWrapper;
