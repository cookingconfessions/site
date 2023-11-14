import CartSection from '@/component/cart/CartSection';
import Layout from '@/component/layout/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cooking Confesssions Shopping Cart',
	description:
		'Cooking Confessions delivers the best African/Kenyan meals in Slovakia',
};

export default function Cart() {
	return (
		<div className='wrapper'>
			<Layout>
				<div className='mt-25'>
					<CartSection />
				</div>
			</Layout>
		</div>
	);
}
