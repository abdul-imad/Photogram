import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadImage from "./components/UploadImage";
import PhotoGrid from "./components/PhotoGrid";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<div className="App">
						<Route path="/" component={Feed}></Route>
						<UploadImage />
						<PhotoGrid />
					</div>
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}
