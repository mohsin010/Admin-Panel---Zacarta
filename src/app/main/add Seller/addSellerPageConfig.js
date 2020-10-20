import React from 'react';

const AddSellerPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/add-seller',
			component: React.lazy(() => import('./addSellerPage'))
		}
	]
};

export default AddSellerPageConfig;
