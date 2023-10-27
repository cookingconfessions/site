import { useCafeuContext } from '@/context/CafeuContext';
import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
interface InfoProp {
	shopData: {
		name: string;
		price: number;
		id: number;
	};
}
const ProductInfo: React.FC<InfoProp> = ({ shopData }) => {
	const { addToCartWithQuantity } = useCafeuContext();
	const [quantity, setQuantity] = useState<number>(1); // Initialize quantity state

	const handleQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
		// Convert the selected value to a number and update the quantity state
		const selectedQuantity = Number(event.target.value);
		setQuantity(selectedQuantity);
	};
	return (
		<div className='product-main-info mb-50'>
			<h4 className='name'>{shopData.name}</h4>
			<div className='rating-div'>
				<ul className='rating'>
					<li>
						{' '}
						<span className='icofont-ui-rating'></span>
					</li>
					<li>
						{' '}
						<span className='icofont-ui-rating'></span>
					</li>
					<li>
						{' '}
						<span className='icofont-ui-rating'></span>
					</li>
					<li>
						{' '}
						<span className='icofont-ui-rating'></span>
					</li>
					<li>
						{' '}
						<span className='icofont-ui-rating unrated'></span>
					</li>
				</ul>
				<p>(3) Rating</p>
			</div>
			<div className='price-section'>
				<p>Price: ${shopData.price}</p>
			</div>
			<ul className='info-list'>
				<li>
					<span>Availability:</span>
					<p>In Stock</p>
				</li>
				<li>
					<span>Product Code:</span>
					<p>#859234</p>
				</li>
				<li>
					<span>Tags:</span>
					<p>Food, BBQ, First Food</p>
				</li>
			</ul>
			<p className='sm-des'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, se d mod tempor ncididunt ut abore et dolore magna
				aliqua. Quis ipsum pendisse ultrices gravida.
			</p>

			<div className='size-qty'>
				<div className='mb-3 select-box'>
					<label htmlFor='exampleFormControlInput1' className='form-label'>
						Size
					</label>
					<Form.Select className='wide'>
						<option data-display='Select'>Select</option>
						<option value='1'>L</option>
						<option value='2'>X</option>
						<option value='3'>XL</option>
						<option value='4'>XXL</option>
						<option value='5'>XXXL</option>
					</Form.Select>
				</div>
				<div className='mb-3 select-box'>
					<label htmlFor='exampleFormControlInput1' className='form-label'>
						QTY
					</label>
					<Form.Select className='wide' onChange={handleQuantityChange} value={quantity ?? ''}>
						<option data-display='Select'>Select</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
					</Form.Select>
				</div>
			</div>

			<div className='cart-sec'>
				<h4>Clear Section</h4>
				<div className='btn-sec'>
					<a className='custom-btn' role='button' onClick={() => addToCartWithQuantity(shopData.id, quantity)}>
						Add To Cart
					</a>
				</div>
			</div>

			<div className='share-link'>
				<p>Share Link</p>
				<ul className='social-ul'>
					<li className='social-list'>
						<a href='' className='social-link'>
							<span className='icofont-facebook'></span>
						</a>
					</li>

					<li className='social-list'>
						<a href='' className='social-link'>
							<span className='icofont-twitter'></span>
						</a>
					</li>

					<li className='social-list'>
						<a href='' className='social-link'>
							<span className='icofont-skype'></span>
						</a>
					</li>

					<li className='social-list'>
						<a href='' className='social-link'>
							<span className='icofont-instagram'></span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProductInfo;
