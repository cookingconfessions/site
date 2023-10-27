import AboutSection from '@/component/about/AboutSection';
import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import Layout from '@/component/layout/Layout';
import ScheduleSection from '@/component/schedule/ScheduleSection';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Cafeu About Page',
	description: 'Developed by Azizur Rahman',
};
export default function About() {
	return (
		<div className='wrapper'>
			<Layout>
				<BreadcrumbSection title='About Us' />
				<AboutSection />
				<ScheduleSection />
			</Layout>
		</div>
	);
}
