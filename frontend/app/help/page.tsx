import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import FaqSection from '@/component/faq/FaqSection';
import Layout from '@/component/layout/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cooking Confessions FAQs',
	description:
		'Cooking Confessions delivers the best African/Kenyan meals in Slovakia',
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
