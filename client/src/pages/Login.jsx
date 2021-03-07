import React, { useState, useRef } from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import Register from './Register';
import {Button, Typography} from 'antd';
const {Title} = Typography;

const Login = (props) =>{
	const {state, onUpdate } = props;
	const history = useHistory();

	const [password, setPassword] = useState(null);
	const [loginStatus, setLoginStatus] = useState("");
	const [registerClicked, setRegisterClicked] = useState(false);

	const login = () => {
		if(!state.email  || !password){
			setLoginStatus('Please enter your email and password!');
			return;
		}
		Axios.post("http://localhost:3001/login", {
			email: state.email,
			password: password,
		}).then((response) => {
			console.log('response message was ', response)
			if(response.data.message === 'success'){
				onUpdate({loggedIn: true});
				if (response.data[0].role === "admin") {
					history.push("/landing", { name: response.data[0].firstname });
				}
			}
			else {
				setLoginStatus(response.data.message);
			} 
		});
	};

	if(registerClicked){
		return(<Register 
			state={state} 
			onUpdate={onUpdate}
			setRegisterClicked={setRegisterClicked}
			/>)
	}
	return (
		<div className="Container">

			<div className="content">
				<div className="header">
					<h1>Welcome to GCU Health</h1>
					<p>The health App that helps you keep track</p>
				</div>
				<div className="login">
					<div className="loginContainer">
						<label>Email</label>
						<input
							type="email"
							onChange={(e) => {
								onUpdate({email: e.target.value});
							}}
						/>
						<label>Password</label>
						<input
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<div className="buttonContainer">
							<Button onClick={login}>Login</Button>
							<Title level={3}>
								Don't have an account?
							</Title>
							<Button onClick={()=>{setRegisterClicked(true);}}>Register</Button>
							<Title level={3} type='secondary' id="loginStatus">{loginStatus}</Title>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;