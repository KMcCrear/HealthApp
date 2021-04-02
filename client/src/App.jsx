import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CovidTracker from "./pages/CovidTracker";
import Axios from "axios";
import _ from "lodash";
import updateOnLogin from "./helpers/updateOnLogin";
import endpoint from "./helpers/endPoint";
import Activities from "./pages/Activities";
import Workouts from "./pages/Workouts";
import AdminEdit from "./pages/AdminEdit";

const App = () => {
	const [state, setNewState] = useState({
		loggedIn: false,
		id: null,
		email: null,
		userLocation: null,
		firstname: null,
		surname: null,
		message: null,
		role: null,
		reminders: [],
	});
	Axios.defaults.withCredentials = true;

	//checking if the user is logged in
	useEffect(() => {
		if (state.loggedIn) {
			return;
		}
		Axios.get(`${endpoint()}/login`).then((response) => {
			console.log("response was ", response.data);
			if (response.data.loggedIn === true) {
				updateOnLogin(onUpdate, response.data.user[0]);
			}
		});
	}, [state.loggedIn]);

	const onUpdate = (object) => {
		const newState = _.cloneDeep(state);
		console.log("updating the state ", object);
		_.merge(newState, object);
		setNewState(newState);
	};

	console.log("state is ", state);
	if (!state.loggedIn) {
		return <Login state={state} onUpdate={onUpdate} />;
	}

	if (state.id) {
		return (
			<div className="App">
				<NavBar state={state} onUpdate={onUpdate} />

				<Route
					path="/home"
					exact
					render={() => <Home state={state} onUpdate={onUpdate} />}
				/>
				<Route
					path="/register"
					render={() => <Register state={state} onUpdate={onUpdate} />}
				/>

				<Route
					path="/register"
					render={() => <Register state={state} onUpdate={onUpdate} />}
				/>
				<Route path="/covidtracking" render={() => <CovidTracker />} />
				<Route
					path="/activities"
					render={() => <Activities state={state} onUpdate={onUpdate} />}
				/>
				<Route
					path="/workouts"
					render={() => <Workouts state={state} onUpdate={onUpdate} />}
				/>

				<Route
					path="/adminedit"
					render={() => <AdminEdit state={state} onUpdate={onUpdate} />}
				/>
			</div>
		);
	}
};
export default App;
