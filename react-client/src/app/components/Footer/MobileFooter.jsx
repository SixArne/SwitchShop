import React from 'react';
import * as Routes from "../../routes";
import {NavLink} from "react-router-dom";

import './MobileFooter.scss';

const MobileFooter = () => {
		return (
				<footer className="footer-mobile">
						<nav className="footer-mobile-nav">
								<NavLink className="footer-mobile-nav-item" activeClassName="active" to={Routes.LANDING}>Shop</NavLink>
								<NavLink className="footer-mobile-nav-item" activeClassName="active" to={Routes.LANDING}>Account</NavLink>
								<NavLink className="footer-mobile-nav-item" activeClassName="active" to={Routes.LANDING}>API</NavLink>
						</nav>
						<div className="footer-mobile-copyright">
								Developed by Arne Six
						</div>
				</footer>
		)
}

export default MobileFooter;