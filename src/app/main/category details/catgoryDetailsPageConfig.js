import React from 'react';

const CategoryDetailsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/view-category',
			component: React.lazy(() => import('./catgoryDetailsPage'))
		}
	]
};

export default CategoryDetailsPageConfig;
