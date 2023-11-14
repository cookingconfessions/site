import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import CheckoutSection from '@/component/checkout/CheckoutSection';
import Layout from '@/component/layout/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cooking confessions Checkout',
	description:
		'Cooking confessions delivers the best African/Kenyan meals in Slovakia',
};

export default function Checkout() {
	return (
		<Layout>
			<BreadcrumbSection title='Checkout' />
			<CheckoutSection />
		</Layout>
	);
}
