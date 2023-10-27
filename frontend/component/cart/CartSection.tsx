'use client';
import { useCafeuContext } from '@/context/CafeuContext';
import ProductTable from '../table/ProductTable';
import CartReccomendationts from './CartReccomendation';
import CouponSection from './CouponSection';

const CartSection = () => {
	const { cart, removeFromCart } = useCafeuContext();
	return (
		<>
			<ProductTable array={cart} removeItem={removeFromCart} cartTable={true} />
			<CouponSection />
			<CartReccomendationts />
		</>
	);
};

export default CartSection;
