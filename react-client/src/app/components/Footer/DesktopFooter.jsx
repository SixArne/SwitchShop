import React from 'react';
import { NavLink } from "react-router-dom";

import * as Routes from '../../routes';

import Luigi from '../../_static/images/luigi.svg';
import Mario from '../../_static/images/mario.svg';

import './DesktopFooter.scss';

const DesktopFooter = () => {
		return (
				<footer className="footer-desktop">
						<div className="footer-desktop-navigation">
								<div className="footer-desktop-navigation-image">
										<img src={Luigi} alt="Luigi jumping high"/>
								</div>
								<div className="footer-desktop-navigation-list">
										<NavLink to={Routes.LANDING}>Home</NavLink>
										<NavLink to={Routes.LOGIN}>Login</NavLink>
										<NavLink to={Routes.REGISTER}>Register</NavLink>
								</div>
								<div className="footer-desktop-navigation-image">
										<img src={Mario} alt="Luigi jumping high"/>
								</div>
						</div>
						<div className="footer-desktop-copyright">
								Developed by Arne Six
						</div>
				</footer>
		)
}

export default DesktopFooter;