'use client';
import Loading from '@/app/menu/loading';
import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import ShopDetailSection from '@/component/shop/ShopDetailSection';
import { useAppContext } from '@/context/AppContext';
import { MenuItem } from '@/types/menu';
import { useApiClient } from '@/utils/api-client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ShopDetails({ slug }: { slug: string }) {
	const { menuItems } = useAppContext();
	const [shopData, setShopData] = useState<MenuItem | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);

		useApiClient()
			.getMenuItem(slug)
			.then((item) => {
				setShopData(item);
				setIsLoading(false);
			});
	}, [menuItems, slug]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : shopData ? (
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
						<p className='no-page-found-text'>
							The Product you are looking for does not exist.
						</p>
						<Link href='/' className='custom-btn'>
							Go back to Home
						</Link>
					</div>
				</>
			)}
		</>
	);
}
