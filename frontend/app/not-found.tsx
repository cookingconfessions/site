import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import Layout from '@/component/layout/Layout';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='wrapper'>
			<Layout>
				<BreadcrumbSection title='404' />
				<div className='dynamic-error-page-container'>
					<div className='not-found-image-container'>
						<img src='/img/404.jpg' alt='page not found' />
					</div>
					<p className='no-page-found-text'>The Page you are looking for does not exist.</p>
					<Link href='/' className='custom-btn'>
						Go back to Home
					</Link>
				</div>
			</Layout>
		</div>
	);
}
