'use client';
import { useAppContext } from '@/context/AppContext';
import { MenuProps } from '@/types/menu';
import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import ProductCard from './ProductCard';

const MenuProducts: React.FC<MenuProps> = ({ style, showMoreBtn }) => {
	const {
		activeMenuProductTab,
		handleMenuProductTabChange,
		categories,
		filteredMenuProductList,
		loadCategories,
		loadMenuItems,
	} = useAppContext();

	useEffect(() => {
		loadCategories();
		loadMenuItems();
	}, []);

	return (
		<section>
			<div className={`product ${style}`}>
				<div className='container'>
					<div className='product-inner'>
						<div className='row'>
							<div
								className='section-head text-center'
								data-aos='fade-up'
								data-aos-duration='500'>
								<span className='sm-title '>Special Menu</span>
								<h2 className='sec-title'>Our Specials Menu</h2>
								<div
									className='product-cat'
									data-aos='fade-up'
									data-aos-duration='1500'>
									<div className='controls'>
										<Nav
											className='cat-menu justify-content-center'
											activeKey={activeMenuProductTab}
											onSelect={handleMenuProductTabChange}>
											<Nav.Item>
												<Nav.Link className='cat-menu-li' eventKey='all'>
													<span className='cat-name'>All Categories</span>
												</Nav.Link>
											</Nav.Item>
											{categories.map((category) => (
												<Nav.Item key={category.id}>
													<Nav.Link
														className='cat-menu-li'
														eventKey={category.name.toLowerCase()}>
														<span className='cat-name'>{category.name}</span>
													</Nav.Link>
												</Nav.Item>
											))}
										</Nav>
									</div>
								</div>
							</div>
						</div>
						<div
							className='describe-content mt-50'
							data-aos='fade-up'
							data-aos-duration='1000'>
							<div
								className='row row-cols-xxl-5 row-cols-lg-4 row-cols-md-3 row-cols-2'
								data-aos='fade-up'
								data-aos-duration='500'>
								{filteredMenuProductList.map((item) => (
									<ProductCard item={item} key={item.id} />
								))}
							</div>
						</div>
						{showMoreBtn && (
							<div className='row'>
								<div className='text-center  my-4'>
									<a className='custom-btn' role='button' href='/menu'>
										Show More
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default MenuProducts;
