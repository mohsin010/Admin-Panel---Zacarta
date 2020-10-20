import React from 'react';

const AddProductsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/add-products',
			component: React.lazy(() => import('./productsPage'))
		}
	]
};

export default AddProductsPageConfig;
