'use client';
import { useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import ShopDescriptionPane from './ShopDescriptionPane';
import ShopReviewPane from './ShopReviewPane';

const ShopDescription = () => {
	const [activeTab, setActiveTab] = useState<string>('description');
	const handleTabChange = (tab: any) => {
		setActiveTab(tab);
	};

	return (
		<div className='description mb-50'>
			<Nav className='nav review-tab mb-3' id='pills-tab' activeKey={activeTab} onSelect={handleTabChange}>
				<Nav.Item className='nav-item'>
					<Nav.Link id='pills-description-tab' type='button' className='shop-nav-btn' eventKey='description'>
						Description
					</Nav.Link>
				</Nav.Item>
				<Nav.Item className='nav-item'>
					<Nav.Link id='pills-review-tab' type='button' className='shop-nav-btn' eventKey='review'>
						Reviews
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<Tab.Content className='tab-content' id='pills-tabContent'>
				<Tab.Pane
					className={`tab-pane fade ${activeTab === 'description' ? 'active show' : ''}`}
					id='pills-description'
					role='tabpanel'
					aria-labelledby='pills-description-tab'>
					<ShopDescriptionPane />
				</Tab.Pane>
				<Tab.Pane
					className={`tab-pane fade ${activeTab === 'review' ? 'active show' : ''}`}
					id='pills-review'
					role='tabpanel'
					aria-labelledby='pills-review-tab'>
					<ShopReviewPane />
				</Tab.Pane>
			</Tab.Content>
		</div>
	);
};

export default ShopDescription;
