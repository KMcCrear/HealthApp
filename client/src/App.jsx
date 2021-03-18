import "./App.css";

import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CovidTracker from "./pages/CovidTracker";
import Axios from "axios";
import _ from 'lodash';
import updateOnLogin from './helpers/updateOnLogin'
import endpoint from './helpers/endPoint'
const App = (props) =>{
	const [state, setNewState] = useState({
		loggedIn: false,
		id: null,
		email: null,
		firstname: null,
		surname: null,
		message: null,
		reminders:[],
	});
	Axios.defaults.withCredentials = true;

	//checking if the user is logged in
	useEffect(() => {
		if(state.loggedIn){
			return;
		}
        Axios.get(`${endpoint()}/login`).then((response) => {
			console.log('response was ', response.data);
            if (response.data.loggedIn === true) {
				updateOnLogin(onUpdate, response.data.user[0]);
            }
        });

    }, []);

	const onUpdate = (object) =>{
		const newState = _.cloneDeep(state);
		console.log('updating the state ', object);
		_.merge(newState, object);
		setNewState(newState);
	}

	console.log('state is ', state);
	if(!state.loggedIn) {
		//user not logged in
		return (<Login state={state} onUpdate={onUpdate}/>)
	}
	return (
		
			<div className="App">
			<NavBar />
			<Router>
				<Route
					path="/home"
					exact
					render={() => (
						<Home state={state} onUpdate={onUpdate} />
					)}
				/>
				<Route
					path="/register"
					render={() => (
						<Register
							state={state}
							onUpdate={onUpdate}
						/>
					)}
				/>
				<Route path="/covidtracking" render={() => <CovidTracker />} />
			</Router>
		</div>
	);
	
}

export default App;
