import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import Layout from '@/component/layout/Layout';
import ShopDetailSection from '@/component/shop/ShopDetailSection';
import { productList } from '@/data/Data';
import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
	title: 'Menu details page',
	description: 'Cooking confessions',
};
export default function ShopDetails({ params }: { params: { slug: string } }) {
	const shopData = productList.find((item) => item.slug === params.slug);

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
