import React, {useState} from 'react';
import {useApi, useAuth} from "../services";

const RegisterPage = () => {
		const [firstname, setFirstname] = useState('')
		const [lastname, setLastname] = useState('')
		const [email, setEmail] = useState('')
		const [password, setPassword] = useState('')

		const [passMatch, setpassMatch] = useState(false);

		const {signup} = useAuth();

		const validatePassword = (repeatPassword) => {
				(repeatPassword !== password)? setpassMatch(false): setpassMatch(true);
		}

		const handleRegister = async (ev) => {
				ev.preventDefault();

				if (!passMatch) return console.log("passwords don't match");

				const response = await signup(email, password, firstname, lastname);

				(response.token)? console.log("registered"): console.log("something went wrong");
		}

		return (
				<div>
						<form onSubmit={handleRegister}>
								<div className="form-item">
										<label htmlFor="firstname">firstname*</label>
										<input id="firstname" onChange={(e) => setFirstname(e.target.value)} type="text" required/>
								</div>
								<div className="form-item">
										<label htmlFor="lastname">lastname*</label>
										<input id="lastname" onChange={(e) => setLastname(e.target.value)} type="text" required/>
								</div>
								<div className="form-item">
										<label htmlFor="email">email*</label>
										<input id="email" onChange={(e) => setEmail(e.target.value)} type="email" required/>
								</div>
								<div className="form-item">
										<label htmlFor="password">password*</label>
										<input id="password" onChange={(e) => setPassword(e.target.value)} type="password" required/>
								</div>
								<div className="form-item">
										<label htmlFor="rPassword">repeat password*</label>
										<input id="rPassword" onChange={(e) => validatePassword(e.target.value)} type="password" required/>
								</div>
								<button type="submit">Register</button>
						</form>
				</div>
		)
}

export default RegisterPage;
