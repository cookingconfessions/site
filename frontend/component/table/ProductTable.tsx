'use client';
import { useAppContext } from '@/context/AppContext';
import { ProductProps } from '@/types/menu';
import Link from 'next/link';
import React from 'react';

const ProductTable: React.FC<ProductProps> = ({
	array,
	removeItem,
	cartTable,
}) => {
	const { handleQuantityChange } = useAppContext();

	return (
		<div className='cart-section cpy-8'>
			<div className='container'>
				<div className='row' data-aos='fade-up' data-aos-duration='500'>
					<div className='table-responsive'>
						<table className='table'>
							<thead className='product-table'>
								<tr>
									<th scope='col'>Image</th>
									<th scope='col'>Name</th>
									<th scope='col'>Price</th>
									{cartTable && <th scope='col'>Quantity</th>}
									<th scope='col'>Action</th>
								</tr>
							</thead>
							<tbody>
								{array.length === 0 ? (
									<tr>
										<td colSpan={12}>
											<div className='empty-cart-container'>
												<div className='empty-cart-img-container'>
													<img src='img/empty-cart.jpg' alt='empty cart' />
												</div>
												<p className='empty-cart-text'>
													No Product In {cartTable ? 'Cart' : 'Wishlist'}
												</p>
											</div>
										</td>
									</tr>
								) : (
									array.map((item) => (
										<tr key={item.id}>
											<td>
												<div className='cart-pd-img'>
													<img src={item.image} alt={item.name} />
												</div>
											</td>
											<td>
												<Link href={`/menu/${item.slug}`}>{item.name}</Link>
											</td>
											<td>{item.price}&nbsp;&euro;</td>
											{cartTable && (
												<td className='qty-td'>
													<form action='#'>
														<div className='input-group quantity'>
															<span
																className='qtyminus minus qt-btn'
																onClick={() =>
																	handleQuantityChange(
																		item.id,
																		item.quantity - 1
																	)
																}>
																–
															</span>
															<input
																className='qty form-control'
																type='text'
																value={item.quantity}
																readOnly
															/>
															<span
																className='qtyplus plus qt-btn'
																onClick={() =>
																	handleQuantityChange(
																		item.id,
																		item.quantity + 1
																	)
																}>
																+
															</span>
														</div>
													</form>
												</td>
											)}

											<td>
												<a
													className='qt-btn product-table-delete-btn'
													role='button'
													onClick={() => removeItem(item.id)}>
													<span className='icofont-close'></span>
												</a>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
					{cartTable ? (
						<div className='shopping-btn'>
							<Link href='/menu' className='custom-btn'>
								Continue Shopping
							</Link>
							<Link href='/checkout' className='custom-btn'>
								Checkout
							</Link>
						</div>
					) : (
						<div className='shopping-btn'>
							<Link href='/menu' className='custom-btn'>
								Continue Shopping
							</Link>
							<Link href='/cart' className='custom-btn'>
								Check Cart
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductTable;
