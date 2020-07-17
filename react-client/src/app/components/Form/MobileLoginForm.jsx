import React, {useEffect, useState} from 'react';
import { useAuth } from '../../services';
import {NavLink, Redirect} from 'react-router-dom';
import * as Routes from '../../routes';

import './MobileLoginForm.scss';

const MobileLoginForm = () => {
		const [email, setEmail] = useState('')
		const [password, setPassword] = useState('')
		const [redirect, setRedirect] = useState(false)

		const {signInLocal} = useAuth();

		const handleLogin = async (ev) => {
				ev.preventDefault();

				const response = await signInLocal(email, password);

				if (response) {
						console.log('test2')
						setRedirect(true);
				}
		}

		const handleRedirect = () =>
		{
				console.log('handled redirect')

				return (
						<Redirect to={Routes.LANDING}/>
				)
		}

		const OauthHandler = async () => {

		}

		useEffect(() => {
				console.log('test');

				if (redirect) {
						handleRedirect();
				}
		}, [redirect])

		return (
				<form onSubmit={handleLogin} className="login-right-pannel">
						<h1>Login into account</h1>
						<div className="login-right-pannel-form-group">
								<label htmlFor="email">email*</label>
								<input id="email" onChange={(e) => setEmail(e.target.value)} type="email" required/>
						</div>
						<div className="login-right-pannel-form-group">
								<label htmlFor="password">password*</label>
								<input id="password" onChange={(e) => setPassword(e.target.value)} type="password" required/>
						</div>
						<div className="login-right-pannel-btns">
								<button className="login-right-pannel-btns-login" type="submit">Login</button>
								<button className="login-right-pannel-btns-oauth" onClick={OauthHandler}>Login with Facebook</button>
								<NavLink to={Routes.REGISTER} className="login-right-pannel-btns-register">I don't have an account</NavLink>
						</div>
				</form>
		)
}

export default MobileLoginForm;