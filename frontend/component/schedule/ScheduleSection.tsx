'use client';

import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';

const ScheduleSection = () => {
	const {
		openBookingModal,
		schedules,
		companyInfo,
		loadSchedules,
		loadCompanyInfo,
	} = useAppContext();

	useEffect(() => {
		loadSchedules();
		loadCompanyInfo();
	}, []);

	return (
		<section>
			<div className='availability mb-200 pb-55'>
				<div className='bg-availa'>
					<div className='container'>
						<div className='position-relative'>
							<div className='row'>
								<div
									className='col-md-6 col-xl-8 col-lg-7 my-2'
									data-aos='fade-right'
									data-aos-duration='1000'>
									<div className='available-content'>
										<h2 className='available-head'>
											You confess, we cook <br /> and deliver African taste.
										</h2>
										<p className='mb-0'>
											Do you have a special dinner, grill party, baby shower or
											any other event? We got you sorted! <br /> Book us now and
											experience great delicacies from our team of chef.
										</p>
									</div>
									<div className='banner-btn-sec mt-3'>
										<button className='custom-btn' onClick={openBookingModal}>
											Book catering
										</button>
									</div>
								</div>
								<div
									className='col-md-6 col-xl-4 col-lg-5 my-2'
									data-aos='fade-left'
									data-aos-duration='1000'>
									<div className='avail-inner'>
										<div className='available-note'>
											<div className='note-head'>
												<span className='sm-title mb-0'>Opening Hours</span>
											</div>
											<ul className='note-ul'>
												{schedules.map((schedule) => (
													<li className='note-li' key={schedule.day}>
														<p className='day'>{schedule.day}</p>
														<p className='time'>{`${schedule.opensAt} - ${schedule.closesAt}`}</p>
													</li>
												))}
											</ul>

											<div className='note-footer'>
												<h4 className='note-footer-text'>Call Us Now</h4>
												<a
													className='note-footer-text'
													href='tel:+993240-765230'>
													{companyInfo.phoneNumbers.split(',')[0]}
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
