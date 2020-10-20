import React from 'react';

const AddCategoryPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/category',
			component: React.lazy(() => import('./categoryPage'))
		}
	]
};

export default AddCategoryPageConfig;
