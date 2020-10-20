import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{

		id: 'seller',
		title: 'Seller',
		// translate: 'Home',
		type: 'item',
		icon: 'home',
		url: '/seller'


	},


	{

		id: 'category',
		title: 'Categories',
		// translate: 'Active Orders',
		type: 'item',
		icon: 'category',
		url: '/category'

	},
	{

		id: 'add-products',
		title: 'Products',
		// translate: 'Active Orders',
		type: 'item',
		icon: 'people',
		url: '/add-products'

	},
	{

		id: 'unit',
		title: 'Units',
		// translate: 'Active Orders',
		type: 'item',
		icon: 'ballot',
		url: '/units'

	},
	
	{

		id: 'customer',
		title: 'Customer',
		// translate: 'Active Orders',
		type: 'item',
		icon: 'people',
		url: '/customer'

	},
	{

		id: 'contacts',
		title: 'Contacts',
		// translate: 'Active Orders',
		type: 'item',
		icon: 'contacts',
		url: '/contacts'

	},
	{

		id: 'logout',
		title: 'Logout',
		// translate: 'LogOut',
		type: 'item',
		icon: 'lock',
		url: '/logout'
	},

];

export default navigationConfig;
