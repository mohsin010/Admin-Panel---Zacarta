import React from 'react';

const SellerPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/seller',
			component: React.lazy(() => import('./SellerPage'))
		}
	]
};

export default SellerPageConfig;
