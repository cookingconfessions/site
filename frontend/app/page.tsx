import Layout from '@/component/layout/Layout';
import HomeMain from '@/component/main/HomeMain';
import { useApiClient } from '@/utils/api-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cooking confessions',
	description:
		'We sell best African meals in Slovakia. Our team of Chef from Kenya are also available for booking to offer catering services.',
};

export default async function Home() {
	const { getCompanyInfo, getSchedule, getBannerItems, getMenuItems, getMenuItemCategories, getFaqs } = useApiClient();

	const [companyInfo, schedule, bannerItems, menuItems, categories] = await Promise.all([
		getCompanyInfo(),
		getSchedule(),
		getBannerItems(),
		getMenuItems(),
		getMenuItemCategories(),
	]);

	return (
		<Layout>
			<HomeMain />
		</Layout>
	);
}
