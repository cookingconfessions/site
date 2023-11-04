'use client';
import { useAppContext } from '@/context/AppContext';
import ProductTable from '../table/ProductTable';
import CartReccomendationts from './CartReccomendation';
import CouponSection from './CouponSection';

const CartSection = () => {
	const { cart, removeFromCart } = useAppContext();
	return (
		<>
			<ProductTable array={cart} removeItem={removeFromCart} cartTable={true} />
			<CouponSection />
			<CartReccomendationts />
		</>
	);
};

export default CartSection;
