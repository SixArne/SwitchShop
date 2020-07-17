import React from 'react';
import { NavLink, Redirect } from "react-router-dom";

import './Sidebar.scss';
import * as Routes from '../../../routes';
import {useAuth} from "../../../services";


const Sidebar = ({className}) => {
		const {logout} = useAuth();

		const handleLogout = async () => {
				await logout();
		}

		return (
				<aside className={className}>
						<ul className="sidebar-menu">
								<li className="sidebar-menu__item">
										<NavLink to={Routes.BACKOFFICE_DASHBOARD}>
												<i className="fas fa-home"></i>
										</NavLink>
								</li>
								<li className="sidebar-menu__item">
										<NavLink to={Routes.BACKOFFICE_ORDERS}>
												<i className="fas fa-shopping-basket"></i>
										</NavLink>
								</li>
								<li className="sidebar-menu__item">
										<NavLink to={Routes.BACKOFFICE_USERS}>
												<i className="fas fa-users"></i>
										</NavLink>
								</li>
								<li className="sidebar-menu__item">
										<NavLink to={Routes.BACKOFFICE_PRODUCTS}>
												<i className="fas fa-dice-d6"></i>
										</NavLink>
								</li>
								<li className="sidebar-menu__item">
										<NavLink onClick={handleLogout} to={Routes.LANDING}>
												<i className="fas fa-sign-out-alt"></i>
										</NavLink>
								</li>
						</ul>
				</aside>
		)
}

export default Sidebar;
