import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	let { user, login } = useContext(AuthContext);
	const history = useHistory();
	if (user !== null) {
		history.push("/");
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await login(email, password);
			setLoading(false);
			props.history.push("/");
		} catch (err) {
			setLoading(false);
			console.log(err);
			alert("Not authorized");
			setEmail("");
			setPassword("");
		}
	};

	const gotoSignup = () => {
		history.push("/signup");
	};

	return (
		<div className="login-form">
			<label htmlFor="email">
				Email:
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</label>
			<br />
			<label htmlFor="password">
				Password:
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</label>
			<br />
			<input
				type="button"
				value="Submit"
				onClick={handleSubmit}
				disabled={loading}
			/>
			<br />
			<br />
			<label htmlFor="signuppage">
				Dont have an account?
				<input type="button" value="Signup" onClick={gotoSignup} />
			</label>
		</div>
	);
}
