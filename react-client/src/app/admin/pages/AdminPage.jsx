import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Routes from '../../routes';
import DashboardPage from './DashboardPage';
import OrdersPage from "./OrdersPage";
import UsersPage from "./UsersPage";
import OrderPage from "./OrderPage";
import ProductPage from "./ProductPage";
import ProductEditPage from "./ProductEditPage";

const AdminPage = ({children}) => {

		return (
				<Fragment>
						<Route exact path={Routes.BACKOFFICE_LANDING}>
								<Redirect to={Routes.BACKOFFICE_DASHBOARD} />
						</Route>
						<Route exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage} />
						<Route exact path={Routes.BACKOFFICE_ORDERS} component={OrdersPage} />
						<Route exact path={`${Routes.BACKOFFICE_ORDER}:id`} component={OrderPage} />
						<Route exact path={Routes.BACKOFFICE_USERS} component={UsersPage} />
						<Route exact path={Routes.BACKOFFICE_PRODUCTS} component={ProductPage} />
						<Route exact path={`${Routes.BACKOFFICE_PRODUCT}:id`} component={ProductEditPage} />
				</Fragment>
		);
};

AdminPage.prototypes = {
		children: PropTypes.any
};

export default AdminPage;