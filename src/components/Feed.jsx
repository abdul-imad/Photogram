import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Feed() {
	const history = useHistory();
	const { user, signout } = useContext(AuthContext);
	const logoutFn = async () => {
		await signout();
		history.push("/login");
	};

	useEffect(() => {
		if (user === null) {
			history.push("/login");
		}
	});
	return (
		<div className="title">
			<div className="navbar">
				<h1>Photogram</h1>
				<input
					className="logoutBtn"
					type="button"
					value="Logout"
					onClick={logoutFn}
				/>
			</div>
			<h2>Your Photos</h2>
		</div>
	);
}
