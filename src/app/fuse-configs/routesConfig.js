import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginPageConfig from 'app/main/auth/login/LoginPageConfig';
import pagesConfigs from 'app/main/pagesConfig';


const routeConfigs = [
	LoginPageConfig,
	...pagesConfigs

];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/login" />
	}
];

export default routes;
