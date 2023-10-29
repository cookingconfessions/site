import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import FaqSection from '@/component/faq/FaqSection';
import Layout from '@/component/layout/Layout';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Cafeu FAQ Page',
	description: 'Developed by Azizur Rahman',
};
export default function Page() {
	return (
		<div className='wrapper'>
			<Layout>
				<BreadcrumbSection title='Help' />
				<FaqSection />
			</Layout>
		</div>
	);
}
