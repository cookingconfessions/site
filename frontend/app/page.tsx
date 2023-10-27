import Header from '@/component/header/Header';
import Layout from '@/component/layout/Layout';
import HomeMain from '@/component/main/HomeMain';
import { Metadata } from '@/types/home';

export const metadata: Metadata = {
	title: 'Cooking confessions',
	description: 'Best african dishes in Slovakia',
};

export default function Home() {
	return (
		<Layout>
			<Header theme='theme-3' logo='img/logo/logo-3.png' />
			<HomeMain />
		</Layout>
	);
}
