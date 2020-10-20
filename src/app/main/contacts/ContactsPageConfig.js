import React from 'react';
import ContactsPage from './ContactsPage';

const ContactsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/contacts',
			component: React.lazy(() => import('./ContactsPage'))
		}
	]
};

export default ContactsPageConfig;
