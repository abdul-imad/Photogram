import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { makeStyles, TextField } from "@material-ui/core";
import { Button, Box } from "@material-ui/core";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const { user, signup } = useContext(AuthContext);
	const history = useHistory();

	const useStyles = makeStyles(() => ({
		email: {
			width: "300px",
			margin: "10px",
		},
		password: {
			width: "300px",
			margin: "20px",
		},
        redirect:{
            position:"relative",
            bottom:"-20px"
        }
	}));

	if (user !== null) {
		history.push("/");
	}

	const handleSubmit = async () => {
		try {
			setLoading(true);
			await signup(email, password);
			setLoading(false);
		} catch (err) {
			alert("Not valid! Signup again");
			setLoading(false);
		}
	};

	const gotoLogin = () => {
		history.push("/login");
	};

	const classes = useStyles();

	return (
		<div className="signup-card">
			<form noValidate autoComplete="off">
				<TextField
					className={classes.email}
					label="Username"
					variant="outlined"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					size="small"
				/>
				<br />
				<TextField
					className={classes.email}
					label="Email"
					variant="outlined"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					size="small"
				/>
				<br />
				<TextField
					className={classes.email}
					label="Set Password"
					type="password"
					variant="outlined"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					size="small"
				/>
				<br />
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					disabled={loading}
				>
					Signup
				</Button>
			</form>
			<Box className={classes.redirect} fontStyle="normal" textAlign="center" m={1}>
				Already have an account?
				<Button
					variant="outlined"
					color="secondary"
					size="small"
					onClick={gotoLogin}
				>
					Login
				</Button>
			</Box>
		</div>
		// <div>
		// 	<label htmlFor="username">
		// 		Username
		// 		<input
		// 			type="text"
		// 			name="username"
		// 			value={username}
		// 			onChange={(e) => {
		// 				setUsername(e.target.value);
		// 			}}
		// 		/>
		// 	</label>
		// 	<br />
		// 	<label htmlFor="email">
		// 		Email
		// 		<input
		// 			type="email"
		// 			name="email"
		// 			value={email}
		// 			onChange={(e) => {
		// 				setEmail(e.target.value);
		// 			}}
		// 		/>
		// 	</label>
		// 	<br />
		// 	<label htmlFor="password">
		// 		Password
		// 		<input
		// 			type="password"
		// 			name="password"
		// 			value={password}
		// 			onChange={(e) => {
		// 				setPassword(e.target.value);
		// 			}}
		// 		/>
		// 	</label>
		// 	<br />
		// 	<input
		// 		type="submit"
		// 		value="Signup"
		// 		onClick={handleSubmit}
		// 		disabled={loading}
		// 	/>
		// 	<br />
		// 	<br />
		// 	<label htmlFor="login-page">
		// 		Already have an account?
		// 		<input type="button" value="Login" onClick={gotoLogin} />
		// 	</label>
		// </div>
	);
}
