import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import Layout from '@/component/layout/Layout';
import ShopSection from '@/component/shop/ShopSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cooking Confessions Shop',
	description:
		'Cooking Confessions delivers the best African/Kenyan meals in Slovakia',
};

export default function Shop() {
	return (
		<div className='wrapper'>
			<Layout>
				<BreadcrumbSection title='Shop' />
				<ShopSection />
			</Layout>
		</div>
	);
}
