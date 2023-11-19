import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import Layout from '@/component/layout/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Payment successful | Cooking confessions',
	description:
		'Cooking confessions delivers the best African/Kenyan meals in Slovakia',
};

export default function CheckoutSuccess() {
	return (
		<Layout>
			<BreadcrumbSection title='Checkout Successful' />
			<div className='container'>
				<p className='c'>Checkout completed successfully</p>
			</div>
		</Layout>
	);
}
