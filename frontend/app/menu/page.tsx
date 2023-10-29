import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import Layout from '@/component/layout/Layout';
import ShopSection from '@/component/shop/ShopSection';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Cafeu Shop Page',
	description: 'Developed by Azizur Rahman',
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
