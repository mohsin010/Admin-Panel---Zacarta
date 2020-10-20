import React from 'react';

const EditSellerPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/edit-seller',
			component: React.lazy(() => import('./editSellerPage'))
		}
	]
};

export default EditSellerPageConfig;
