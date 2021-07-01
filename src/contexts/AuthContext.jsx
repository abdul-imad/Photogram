import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

export const AuthContext = React.createContext();
export const UseAuth = () => {
	useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	const login = async (email, password) => {
		await auth.signInWithEmailAndPassword(email, password);
		console.log("Login");
	};

	const signup = async (email, password) => {
		await auth.createUserWithEmailAndPassword(email, password);
	};

	const signout = async () => {
		await auth.signOut();
	};

	useEffect(() => {
		let resp = auth.onAuthStateChanged((user) => {
			setUser(user);
			setLoading(false);
		});
		return () => {
			resp();
		};
	}, [user]);
	const value = {
		user,
		login,
		signup,
		signout,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
