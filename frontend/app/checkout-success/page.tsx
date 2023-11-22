import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import CheckoutSuccessSection from '@/component/checkout/CheckoutSuccessSection';
import Layout from '@/component/layout/Layout';
import CheckoutWrapper from '@/context/CheckoutWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Order successful | Cooking confessions',
	description:
		'Cooking confessions delivers the best African/Kenyan meals in Slovakia',
};

export default function CheckoutSuccess() {
	return (
		<Layout>
			<BreadcrumbSection title='Order Successful' />
			<CheckoutWrapper>
				<CheckoutSuccessSection />
			</CheckoutWrapper>
		</Layout>
	);
}
