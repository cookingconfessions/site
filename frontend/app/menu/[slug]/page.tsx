import Layout from '@/component/layout/Layout';
import ShopDetails from '@/component/shop/ShopDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cooking Confessions Menu Details',
	description:
		'Cooking Confessions sells best African meals in Slovakia. Our team of Chef from Kenya are also available for booking to offer catering services.',
};

export default function ShopDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<Layout>
			<ShopDetails slug={params.slug} />
		</Layout>
	);
}
