'use client';
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
interface BreadcrumbSectionProps {
	title: string;
	header?: string;
}
const BreadcrumbSection: React.FC<BreadcrumbSectionProps> = ({ title }) => {
	return (
		<div className='breadcrumb-section mb-10'>
			<div className='container'>
				<div className='row'>
					<div className='breadcrumb-list' data-aos='fade-up' data-aos-duration='1500'>
						<Breadcrumb>
							<Breadcrumb.Item href='/' className='page-route-link'>
								Home
							</Breadcrumb.Item>
							<Breadcrumb.Item active>{title}</Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BreadcrumbSection;
