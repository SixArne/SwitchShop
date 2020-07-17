import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

import * as Routes from '../../routes';

import Logo from '../../_static/images/logo.svg';
import Menu from '../../_static/images/mobile-nav.svg';
import Close from '../../_static/images/close.svg';

import './MobileHeader.scss';

const MobileHeader = () => {
		const [toggled, setToggled] = useState(false);

		const burgerHandler = () => {
			setToggled(!toggled);
		}

		useEffect(() => {
				setToggled(false);
		}, [])

		return (
				(!toggled)? (
						<header className="header-mobile">
								<div className="header-mobile-logo">
										<NavLink to={Routes.LANDING}>
												<img src={Logo} alt="The SwitchShop logo"/>
										</NavLink>
								</div>
								<div className="header-mobile-options">
										<img src={Menu} onClick={burgerHandler} alt="Navigation menu"/>
								</div>
						</header>
				): (
						<nav className="navigation-mobile">
								<div className="navigation-mobile-close">
										<img src={Close} onClick={burgerHandler} alt="Close the navigation"/>
								</div>
								<div className="navigation-mobile-list">
										<NavLink to={Routes.LANDING} onClick={burgerHandler} className="navigation-mobile-list-item">Home</NavLink>
										<NavLink to={Routes.LOGIN} onClick={burgerHandler} className="navigation-mobile-list-item">Login</NavLink>
										<NavLink to={Routes.REGISTER} onClick={burgerHandler} className="navigation-mobile-list-item">Register</NavLink>
										<NavLink to={Routes.CHECKOUT} onClick={burgerHandler} className="navigation-mobile-list-item">Cart</NavLink>
								</div>
						</nav>
				)
		)
}

export default MobileHeader;