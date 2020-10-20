import React from 'react';

const CustomerPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/customer',
			component: React.lazy(() => import('./CustomerPage'))
		}
	]
};

export default CustomerPageConfig;
