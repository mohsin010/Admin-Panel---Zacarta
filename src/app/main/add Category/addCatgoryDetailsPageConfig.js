import React from 'react';

const AddCategoryDetailsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/add-category',
			component: React.lazy(() => import('./addCatgoryDetailsPage'))
		}
	]
};

export default AddCategoryDetailsPageConfig;
