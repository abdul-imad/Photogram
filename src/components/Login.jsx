import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { makeStyles, TextField } from "@material-ui/core";
import { Button, Box } from "@material-ui/core";

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	let { user, login } = useContext(AuthContext);
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
	}));

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
			let error = err.code.split("/")[1];
			alert(error);
			setEmail("");
			setPassword("");
		}
	};

	const gotoSignup = () => {
		history.push("/signup");
	};

	const classes = useStyles();

	return (
		<div className="login-card">
			<form noValidate autoComplete="off">
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
					className={classes.password}
					label="Password"
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
					Login
				</Button>
			</form>
			<Box fontStyle="normal" textAlign="center" m={1}>
				Dont have an account?
				<Button
					variant="outlined"
					color="secondary"
					size="small"
					onClick={gotoSignup}
				>
					Signup
				</Button>
			</Box>
		</div>
	);
}
