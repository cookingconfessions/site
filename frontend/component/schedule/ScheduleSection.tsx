'use client';

import { useCafeuContext } from '@/context/CafeuContext';

const ScheduleSection = () => {
	const { openBookingModal } = useCafeuContext();

	return (
		<section>
			<div className='availability mb-200 pb-55'>
				<div className='bg-availa'>
					<div className='container'>
						<div className='position-relative'>
							<div className='row'>
								<div className='col-md-6 col-xl-8 col-lg-7 my-2' data-aos='fade-right' data-aos-duration='1000'>
									<div className='available-content'>
										<h2 className='available-head'>
											You confess, we cook <br /> and deliver African taste.
										</h2>
										<p className='mb-0'>
											Do you have a grill party, wedding, baby shower or an event? We got you sorted! <br /> We are
											available for booking. All we promise is great delicacies from our team.
										</p>
									</div>
									<div className='banner-btn-sec mt-3' onClick={openBookingModal}>
										<a className='custom-btn'>Book catering</a>
									</div>
								</div>
								<div className='col-md-6 col-xl-4 col-lg-5 my-2' data-aos='fade-left' data-aos-duration='1000'>
									<div className='avail-inner'>
										<div className='available-note'>
											<div className='note-head'>
												<span className='sm-title mb-0'>Opening Hours</span>
											</div>
											<ul className='note-ul'>
												<li className='note-li'>
													<p className='day'>Sunday to Tuesday</p>
													<p className='time'>09:00 - 06:00</p>
												</li>
												<li className='note-li'>
													<p className='day'>Friday to Sunday</p>
													<p className='time'>06:00 - 09:00</p>
												</li>
												<li className='note-li'>
													<p className='day'>Sunday to Tuesday</p>
													<p className='time'>09:00 - 06:00</p>
												</li>
												<li className='note-li'>
													<p className='day'>Monday to Friday</p>
													<p className='time'>06:00 - 09:00</p>
												</li>
												<li className='note-li'>
													<p className='day'>Monday to Saturday</p>
													<p className='time'>06:00 - 09:00</p>
												</li>
											</ul>

											<div className='note-footer'>
												<h4 className='note-footer-text'>Call Us Now</h4>
												<a className='note-footer-text' href='tel:+993240-765230'>
													+993240-765230
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ScheduleSection;
