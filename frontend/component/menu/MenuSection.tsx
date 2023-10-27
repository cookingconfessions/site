import { useCafeuContext } from '@/context/CafeuContext';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';

const MenuSection = () => {
	const {
		activeMenuTab,
		handleMenuTabChange,
		filteredItemList,
		addToCart,
		addToWishlist,
		wishlist,
	} = useCafeuContext();
	return (
		<section>
			<div className='all-product all-product-1 menu-section-container'>
				<div className='product-inner cpy-8'>
					<div className='container'>
						<div className='row'>
							<div className='section-head text-center'>
								<span className='sm-title '>Special Menu</span>
								<h2 className='sec-title'>Our Specials Menu</h2>
								<div className='product-cat mb-40'>
									<div className='controls'>
										<Nav
											className='cat-menu justify-content-center home-1-menu-section'
											activeKey={activeMenuTab}
											onSelect={handleMenuTabChange}>
											<Nav.Item>
												<Nav.Link className='cat-menu-li ' eventKey='all'>
													<img src='img/category/icon/7.png' alt='' className='cat-icon' />
													<span className='cat-name'>All</span>
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link className='cat-menu-li ' eventKey='pizza'>
													<img src='img/category/icon/1.png' alt='' className='cat-icon' />
													<span className='cat-name'>Pizza</span>
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link className='cat-menu-li' eventKey='asian'>
													<img src='img/category/icon/2.png' alt='' className='cat-icon' />
													<span className='cat-name'>Asian</span>
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link className='cat-menu-li' eventKey='burger'>
													<img src='img/category/icon/3.png' alt='' className='cat-icon' />
													<span className='cat-name'>Burger</span>
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link className='cat-menu-li' eventKey='salad'>
													<img src='img/category/icon/4.png' alt='' className='cat-icon' />
													<span className='cat-name'>Salad</span>
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link className='cat-menu-li' eventKey='bakery'>
													<img src='img/category/icon/5.png' alt='' className='cat-icon' />
													<span className='cat-name'>Bakery</span>
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link className='cat-menu-li' eventKey='drink'>
													<img src='img/category/icon/6.png' alt='' className='cat-icon' />
													<span className='cat-name'>Drink</span>
												</Nav.Link>
											</Nav.Item>
										</Nav>
									</div>
								</div>
							</div>
						</div>
						<div className='row' data-aos='fade-up' data-aos-duration='1000'>
							{filteredItemList.map((item) => (
								<div className={`col-xl-4 col-lg-4 col-md-6 col-sm-3 mb-4 mix ${item.category}`} key={item.id}>
									<div className='product-card'>
										<div className='product-img'>
											<Link href='/shop'>
												<img src={item.imgSrc} alt='image not found' />
											</Link>
										</div>
										<div className='product-details'>
											<Link href={`/shop/${item.slug}`} className='product-name'>
												{item.name}
											</Link>
											<p className='product-sm-des'>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tellus turpis
											</p>
											<div className='cart-price-wishlist'>
												<p className='delivery-text'>Delivery Fee : $10</p>
												<div className='cart-wishlist'>
													<a
														className={`sm-custom-btn wishlist-btn ${
															wishlist.some((wishlistItem) => wishlistItem.id === item.id) ? 'active' : ''
														}`}
														role='button'
														onClick={() => addToWishlist(item.id)}>
														<span className='icofont-plus'></span>
													</a>
													<a className='sm-custom-btn cart-btn' role='button' onClick={() => addToCart(item.id)}>
														<span className='icofont-cart-alt'></span>
													</a>
												</div>
											</div>
										</div>
										<p className='product-price'>${item.price}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MenuSection;
