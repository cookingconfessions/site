'use client';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';

const FaqSection = () => {
	const {
		openAccordion,
		handleAccordionBtn,
		openContactModal,
		faqs,
		loadFaqs,
	} = useAppContext();
	const halfIndex = faqs.length === 0 ? -1 : Math.floor(faqs.length / 2);

	useEffect(() => {
		loadFaqs();
	}, []);

	return (
		<section className='faq' id='faq'>
			<div className='container'>
				<div
					className='section-head text-center '
					data-aos='fade-up'
					data-aos-duration='1000'>
					<span className='sm-title theme-3'>Help center</span>
					<h2 className='sec-title'>How can we help?</h2>
				</div>
				<div className='row mt-40'>
					<div className='col-md-6 col-lg-6'>
						<div className='faq__main'>
							{faqs.slice(0, halfIndex).map((item) => (
								<div
									className='faq__content'
									data-aos='fade-up'
									data-aos-duration='1000'
									key={item.id}>
									<div className='faq__que'>
										<button onClick={() => handleAccordionBtn(item.id)}>
											{item.question}
										</button>{' '}
										<i
											className={`${
												openAccordion === item.id
													? 'icofont-minus'
													: 'icofont-plus'
											}`}
											role='button'
											onClick={() => handleAccordionBtn(item.id)}></i>
									</div>
									{openAccordion === item.id && (
										<div className='faq__ans'>
											<p>{item.answer}</p>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
					<div className='col-md-6 col-lg-6'>
						<div className='faq__main'>
							{faqs.slice(halfIndex).map((item) => (
								<div
									className='faq__content'
									data-aos='fade-up'
									data-aos-duration='1000'
									key={item.id}>
									<div className='faq__que'>
										<button onClick={() => handleAccordionBtn(item.id)}>
											{item.question}
										</button>
										<i
											className={`${
												openAccordion === item.id
													? 'icofont-minus'
													: 'icofont-plus'
											}`}
											role='button'
											onClick={() => handleAccordionBtn(item.id)}></i>
									</div>
									{openAccordion === item.id && (
										<div className='faq__ans'>
											<p>{item.answer}</p>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='text-center  my-4'>
						<a className='custom-btn' role='button' onClick={openContactModal}>
							Contact us
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FaqSection;
