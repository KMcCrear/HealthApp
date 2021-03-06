import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Register from "./Register";
import { Typography } from "antd";
import updateOnLogin from "../helpers/updateOnLogin";
import endpoint from "../helpers/endPoint";

const { Title } = Typography;

const Login = (props) => {
	const { state, onUpdate } = props;
	const history = useHistory();

	const [password, setPassword] = useState(null);
	const [loginStatus, setLoginStatus] = useState("");
	const [registerClicked, setRegisterClicked] = useState(false);

	const login = () => {
		if (!state.email || !password) {
			setLoginStatus("Please enter your email and password!");
			return;
		}
		Axios.post(`${endpoint()}/login`, {
			email: state.email,
			password: password,
		}).then((response) => {
			console.log("response message was ", response);
			if (!response.data.message) {
				updateOnLogin(onUpdate, response.data[0]);
				if (
					response.data[0]?.role === "admin" ||
					response.data[0]?.role === "user"
				) {
					history.push("/landing", { name: response.data[0].firstname });
				}
				history.push("/home");
			} else {
				setLoginStatus(response.data.message);
			}
		});
	};

	if (registerClicked) {
		return (
			<Register
				state={state}
				onUpdate={onUpdate}
				setRegisterClicked={setRegisterClicked}
			/>
		);
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
						<label class='label'>Email</label>
						<input
							type="email"
							onChange={(e) => {
								onUpdate({ email: e.target.value });
							}}
						/>
						<label class='label'>Password</label>
						<input
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							onSubmit={login}
						/>
						<div className="buttonContainer">
							<button onClick={login}>Login</button>
							<Title level={4}>Don't have an account?</Title>
							<button
								onClick={() => {
									setRegisterClicked(true);
								}}
							>
								Register
							</button>
							<Title level={3} type="secondary" id="loginStatus">
								{loginStatus}
							</Title>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
