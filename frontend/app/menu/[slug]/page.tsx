'use client';
import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import Layout from '@/component/layout/Layout';
import ShopDetailSection from '@/component/shop/ShopDetailSection';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';

export default function ShopDetails({ params }: { params: { slug: string } }) {
	const { menuItems } = useAppContext();

	const shopData = menuItems.find((item) => item.slug === params.slug);

	return (
		<Layout>
			{shopData ? (
				<>
					<BreadcrumbSection title='Menu Details' />
					<ShopDetailSection shopData={shopData} />
				</>
			) : (
				<>
					<BreadcrumbSection title='Menu Details' />
					<div className='dynamic-error-page-container'>
						<div className='not-found-image-container'>
							<img src='/img/404.jpg' alt='page not found' />
						</div>
						<p className='no-page-found-text'>The Product you are looking for does not exist.</p>
						<Link href='/' className='custom-btn'>
							Go back to Home
						</Link>
					</div>
				</>
			)}
		</Layout>
	);
}
