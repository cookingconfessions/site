'use client';
import { useAppContext } from '@/context/AppContext';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const ProductLightBoxModal: React.FC = () => {
	const {
		isLightBoxModalOpen,
		closeLightBoxModal,
		product,
		addToCartWithQuantity,
	} = useAppContext();

	const defaultQuickViewQuantity = 1;
	const [quickViewQuantity, setQuickViewQuantity] = useState<number>(
		defaultQuickViewQuantity
	);

	const handleQuickViewQuantityChange = (newQuantity: number) => {
		if (newQuantity >= 1) {
			setQuickViewQuantity(newQuantity);
		}
	};
	return (
		<Modal
			backdropClassName='lightbox-modal-backdrop'
			className='product-quick-view-modal'
			show={isLightBoxModalOpen}
			onHide={closeLightBoxModal}
			size='lg'
			centered>
			<Modal.Body className='lightbox-modal-body'>
				{product && (
					<div className='single-product-quick-view'>
						<div className='quick-view-container'>
							<div className='quick-view-img-container'>
								<img src={`${product.image}`} alt='product-image' />
							</div>
							<div className='quick-view-text-container'>
								<h3 className='product-title'>{product.name}</h3>
								<div className='quick-view-price-rating'>
									<h4 className='quick-view-price-range mt-15'>
										$ {product.price}
									</h4>
								</div>
								<div className='quick-view-product-infos'>
									<p>{product.description}</p>
								</div>
								<div className='quick-view-product-action'>
									<div className='quick-view-product-details-quantity'>
										<button
											className='minus-btn cart-product-minus'
											disabled={!product.isAvailable || quickViewQuantity === 1}
											onClick={() =>
												handleQuickViewQuantityChange(quickViewQuantity - 1)
											}>
											<i className='icofont-minus'></i>
										</button>
										<input
											type='number'
											name='product-quantity'
											className='cart-product-quantity-input'
											min={1}
											max={99}
											value={quickViewQuantity}
											onChange={(e) =>
												handleQuickViewQuantityChange(
													Math.max(1, parseInt(e.target.value))
												)
											}
										/>
										<button
											disabled={!product.isAvailable}
											className='plus-btn cart-product-plus'
											onClick={() =>
												handleQuickViewQuantityChange(quickViewQuantity + 1)
											}>
											<i className='icofont-plus'></i>
										</button>
									</div>
									<a
										role='button'
										className={`quick-view-btn ${
											product && !product.isAvailable && 'opacity-25'
										}`}
										onClick={() =>
											product.isAvailable
												? addToCartWithQuantity(product.id, quickViewQuantity)
												: ''
										}>
										Add to Cart
									</a>
								</div>
							</div>
						</div>
					</div>
				)}
			</Modal.Body>
		</Modal>
	);
};

export default ProductLightBoxModal;
