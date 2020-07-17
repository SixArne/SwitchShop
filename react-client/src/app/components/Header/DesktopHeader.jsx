import React from 'react';
import { NavLink } from "react-router-dom";

import * as Routes from '../../routes';
import Account from '../../_static/images/account.svg';
import Logo from '../../_static/images/logo.svg';
import Basket from '../../_static/images/cart.svg';

import './DesktopHeader.scss';

const DesktopHeader = () => {
		const searchbarHandler = () => {
			//
		}

		return (
				<header className="header-desktop">
						<div className="header-desktop-logo">
								<NavLink to={Routes.LANDING}>
										<img src={Logo} alt="SwitchShop Logo"/>
								</NavLink>
						</div>
						<div className="header-desktop-searchbar">
								<input type="text"/>
								<button onClick={searchbarHandler} >Search</button>
						</div>
						<div className="header-desktop-navigation">
								<NavLink to={Routes.LOGIN}>Login</NavLink>
								<NavLink to={Routes.REGISTER}>Register</NavLink>
								<NavLink to={Routes.LANDING}>
										<img src={Account} className="header-desktop-navigation-icon" alt="User backstage"/>
								</NavLink>
								<NavLink to={Routes.LANDING}>
										<img src={Basket} className="header-desktop-navigation-icon" alt="SwitchShop shopping basket"/>
								</NavLink>
						</div>
				</header>
		)
}

export default DesktopHeader;