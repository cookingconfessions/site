const OrderFeatureSection = () => {
	return (
		<div className='order-feature-area pt-100 pb-70'>
			<div className='container'>
				<div className='row'>
					<div className='col-12' data-aos='fade-up' data-aos-duration='1000'>
						<div className='cb-section-title text-center mb-45'>
							<p className='cb-section-icon mb-0'>
								<span className='cb-section-icon-inner'>
									<i className='icofont-beans'></i>
								</span>
							</p>
							<span className='sm-title theme-3'>How we do it</span>
							<h2 className='section-title'>Treat yourself</h2>
							<p>
								We are here for you! <br />
								We got you well crafted African cuisines. <br /> Treat yourself
								and loved ones any time and enjoy authentic flavours.
							</p>
						</div>
					</div>
				</div>
				<div className='row'>
					<div
						className='col-xl-4 col-lg-4 col-md-6 col-sm-6'
						data-aos='fade-up'
						data-aos-duration='2000'>
						<div className='order-feature-single text-center mb-30'>
							<span className='order-feature-icon'>
								<img src='img/feature/african-meal-order.png' alt='icon' />
							</span>
							<h4 className='order-feature-title'>Easily Order</h4>
							<p>Order one of our African cuisines. </p>
						</div>
					</div>
					<div
						className='col-xl-4 col-lg-4 col-md-6 col-sm-6'
						data-aos='fade-up'
						data-aos-duration='1500'>
						<div className='order-feature-single text-center mb-30'>
							<span className='order-feature-icon'>
								<img src='img/feature/african-meal-delivery.png' alt='icon' />
							</span>
							<h4 className='order-feature-title'>Quick Delivery</h4>
							<p>We delivers instantly. </p>
						</div>
					</div>
					<div
						className='col-xl-4 col-lg-4 col-md-6 col-sm-6'
						data-aos='fade-up'
						data-aos-duration='1000'>
						<div className='order-feature-single text-center mb-30'>
							<span className='order-feature-icon'>
								<img src='img/feature/african-meal-enjoy.png' alt='icon' />
							</span>
							<h4 className='order-feature-title'>Enjoy</h4>
							<p>Enjoy, you only live once! </p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderFeatureSection;
