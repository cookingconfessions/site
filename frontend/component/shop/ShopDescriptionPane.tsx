import { ShopDetailsProp } from '@/types/menu';

const ShopDescriptionPane: React.FC<ShopDetailsProp> = ({ shopData }) => {
	return (
		<div className='blog-details'>
			<div className='post-des'>
				<p className='service-des mb-3'>{shopData.description}</p>
			</div>
		</div>
	);
};

export default ShopDescriptionPane;
