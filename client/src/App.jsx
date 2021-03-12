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
import populateState from './helpers/populateState'
const App = () =>{
	const [state, setNewState] = useState({
		loggedIn: false,
		email: null,
		firstname: null,
		surname: null,
		message: null,
	});
	Axios.defaults.withCredentials = true;

	useEffect(() => {
		if(state.loggedIn){
			return;
		}
        Axios.get("http://localhost:3001/login").then((response) => {
			console.log('response was ', response.data);
            if (response.data.loggedIn == true) {
				populateState(onUpdate, response.data.user[0]);
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
		return (<Login state={state} onUpdate={onUpdate}/>)
	}
	return (
		
			<div className="App">
			<NavBar />
			<Router>
				<Route
					path="/"
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
