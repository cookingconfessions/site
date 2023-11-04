import Layout from '@/component/layout/Layout';
import HomeMain from '@/component/main/HomeMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cooking confessions',
	description:
		'We sell best African meals in Slovakia. Our team of Chef from Kenya are also available for booking to offer catering services.',
};

export default function Home() {
	return (
		<Layout>
			<HomeMain />
		</Layout>
	);
}
