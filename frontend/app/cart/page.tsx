import CartSection from '@/component/cart/CartSection';
import Layout from '@/component/layout/Layout';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Cafeu Cart Page',
	description: 'Developed by Azizur Rahman',
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
