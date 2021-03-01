import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

import NavBar from "../components/NavBar";

function Home() {
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginStatus, setLoginStatus] = useState("");

	Axios.defaults.withCredentials = true;

	const login = () => {
		Axios.post("http://localhost:3001/login", {
			email: email,
			password: password,
		}).then((response) => {
			if (response.data.message) {
				setLoginStatus(response.data.message);
			} else {
				setLoginStatus(
					"Welcome " +
						response.data[0].firstname +
						" " +
						response.data[0].surname
				);
				if (response.data[0].role == "admin") {
					history.push("/landing", { name: response.data[0].firstname });
				}
			}
		});
	};

	useEffect(() => {
		Axios.get("http://localhost:3001/login").then((response) => {
			if (response.data.login) {
				setLoginStatus(response.date[0].firstname);
			}
		});
	}, []);

	return (
		<div className="Container">
			<div>
				<NavBar />
			</div>
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
								setEmail(e.target.value);
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
							<button onClick={login}>Login</button>
							<p>
								Don't have an account? register{" "}
								<span>
									<Link to={"/register"}>here</Link>
								</span>
							</p>
							<p id="loginStatus">{loginStatus}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
