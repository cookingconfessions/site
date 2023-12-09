import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { Spinner } from 'react-bootstrap';
import ProductCard from '../menu/ProductCard';

const ShopAllProductSection = () => {
	const {
		filteredProducts,
		currentPage,
		handlePageChange,
		totalPages,
		isShopLoading,
	} = useAppContext();

	return (
		<div className='shop-products-wrapper'>
			{isShopLoading ? (
				<Spinner
					className='overlay-spinner'
					animation='border'
					variant='warning'
				/>
			) : filteredProducts.length === 0 ? (
				<div className='no-product-container'>
					<div className='no-product-img-container'>
						<img src='/img/no-product.png' alt='no-product-img' />
					</div>
					<p className='no-product-text'>No Product Available</p>
					<Link href='/' className='custom-btn mt-10'>
						Go back to Home
					</Link>
				</div>
			) : (
				<>
					<div
						className='row row-cols-xxl-3 row-cols-lg-2 row-cols-md-2 row-cols-2'
						data-aos='fade-up'
						data-aos-duration='500'>
						{filteredProducts.map((item) => (
							<ProductCard item={item} key={item.id} />
						))}
					</div>
					<div
						className='basic-pagination mb-50 mt-20'
						data-aos='fade-up'
						data-aos-duration='400'>
						<ul className='page-numbers'>
							<li>
								<button
									disabled={currentPage === 1}
									onClick={() => handlePageChange(currentPage - 1)}
									className='page-number-btn'>
									<i className='icofont-rounded-left'></i>
								</button>
							</li>
							{Array.from({ length: Math.ceil(totalPages) }).map((_, index) => (
								<li key={index}>
									<button
										className={`page-number-btn ${
											currentPage === index + 1 ? 'current' : ''
										}`}
										onClick={() => handlePageChange(index + 1)}>
										<span aria-current='page' className='page-number'>
											{index + 1}
										</span>
									</button>
								</li>
							))}
							<li>
								<button
									disabled={currentPage === totalPages}
									className='page-number-btn'
									onClick={() => handlePageChange(currentPage + 1)}>
									<i className='icofont-rounded-right'></i>
								</button>
							</li>
						</ul>
					</div>
				</>
			)}
		</div>
	);
};

export default ShopAllProductSection;
