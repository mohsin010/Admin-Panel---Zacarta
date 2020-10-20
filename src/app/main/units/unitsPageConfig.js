import React from 'react';

const UnitsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/units',
			component: React.lazy(() => import('./unitsPage'))
		}
	]
};

export default UnitsPageConfig;
