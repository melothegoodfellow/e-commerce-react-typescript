import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { loginUser } from "../redux/actions/authencation.actions";

function LoginPage(props: any){

	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const userDetails = useSelector((state: any) => state.userDetails);
	const { user, loading, error } = userDetails;

	useEffect(() => {
		if(user) {
			props.history.push("/");
		}
		return () => {};
	}, [ user ]);

	return (
		<div className="authentication">
			<div className="container">
				<form onSubmit={
						(event: any) => {
							event.preventDefault();
							dispatch(loginUser(email, password));
						}
					}>
					<ul>
						<li>
							<h3>
								Login
							</h3>
						</li>
						<li>
							{
								loading && <div> Loading... </div>
							}
							{
								error && <div>{ error.message }</div>
							}
						</li>
						<li>
							<label htmlFor="email">
								Email:
							</label>
							<input type="email" name="email"
								onChange={
									(event: any) => setEmail(event.target.value)
								} />
						</li>
						<li>
							<label htmlFor="password">
								Password:
							</label>
							<input type="password" name="password"
								onChange={(
									event: any) => setPassword(event.target.value)
								} />
						</li>
						<li>
							<button type="submit" 
								className="button primary">
								Login
							</button>
						</li>
						<li className="action">
							<span>
								New to ecommerce?
							</span>
							<Link to="/register">
								Register
							</Link>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;