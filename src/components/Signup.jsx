import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const { user, signup } = useContext(AuthContext);
	const history = useHistory();
	if (user !== null) {
		history.push("/");
	}

	const handleSubmit = async () => {
		setLoading(true);
		await signup(email, password);
		setLoading(false);
	};

	const gotoLogin = () => {
		history.push("/login");
	};

	return (
		<div>
			<label htmlFor="username">
				Username
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
			</label>
			<br />
			<label htmlFor="email">
				Email
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
				Password
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
				type="submit"
				value="Signup"
				onClick={handleSubmit}
				disabled={loading}
			/>
			<br />
			<br />
			<label htmlFor="login-page">
				Already have an account?
				<input type="button" value="Login" onClick={gotoLogin} />
			</label>
		</div>
	);
}
