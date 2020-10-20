import React from 'react';

const ProductsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/products',
			component: React.lazy(() => import('./productsPage'))
		}
	]
};

export default ProductsPageConfig;
