import React from 'react';


const SellerDetailsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/seller-details',
			component: React.lazy(() => import('./SellerDetailsPage'))
		}
	]
};

export default  SellerDetailsPageConfig ;
