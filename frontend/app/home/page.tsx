import Header from '@/component/header/Header';
import HomeMain from '@/component/main/HomeMain';
import SearchModal from '@/component/modal/SearchModal';
import VideoModal from '@/component/modal/VideoModal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cooking confessions',
	description: 'Best african dishes in Slovakia',
};
export default function HomePage() {
	return (
		<div className='wrapper theme-3'>
			<Header theme='theme-3' logo='img/logo/logo-3.png' />
			<HomeMain />
			<SearchModal style='yellow-theme' />
			<VideoModal />
		</div>
	);
}
