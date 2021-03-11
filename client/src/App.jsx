import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from './components/NavBar';
import Login from './pages/Login'
import Test from './pages/Test'

class App extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			loggedIn: false,
			email: null,
			firstname: null,
			surname: null,
			message: null,
		}
	}
	onUpdate(object){
		this.setState(object);
	}
	render(){
	console.log('state is ', this.state)
	return (
		<>
		<div className='App'>
		<NavBar/>
		<Router>
			<Route path="/" exact render={()=><Home state={this.state} onUpdate={this.onUpdate.bind(this)}/>} />
			<Route path="/register" render={()=><Register state={this.state} onUpdate={this.onUpdate.bind(this)}/>} />
		</Router>
		</div>
		</>
	);
	}
}

export default App;