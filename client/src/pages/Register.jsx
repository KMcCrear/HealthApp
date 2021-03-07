import { React, useState } from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import Axios from "axios";
import { Link } from "react-router-dom";
import {Button } from 'antd';
import {CaretLeftOutlined } from '@ant-design/icons';
import Login from './Login';
import populateState from '../helpers/populateState';

const  Register = (props) => {
	const [showLinks, setShowLinks] = useState(false);
	const {state, onUpdate, setRegisterClicked} = props;
	const [firstNameReg, setFirstNameReg] = useState(null);
	const [surNameReg, setSurNameReg] = useState(null);
	const [emailReg, setEmailReg] = useState(null);
	const [passwordReg, setPasswordReg] = useState(null);
	const [passwordTwoReg, setPasswordTwoReg] = useState(null);
	const [registerStatus, setRegisterStatus] = useState(null);

	const registerUser = () => {
		if (!firstNameReg || !surNameReg || !emailReg || !passwordReg || !passwordTwoReg) {
			alert("Please fill in the fields!");
		} else if(passwordReg!==passwordTwoReg){
			alert("Passwords don't match!")
		}else {
			Axios.post("http://localhost:3001/register", {
				firstname: firstNameReg,
				surname: surNameReg,
				email: emailReg,
				password: passwordReg,
			}).then((response) => {
				if (response.data.message) {
					setRegisterStatus(response.data.message);
				} else {
					setRegisterStatus("Welcome Registration Successful");
					populateState(onUpdate, response.data[0]);
					onUpdate({loggedIn:true});
				}
			});
		}
	};
	
	return (
		<div className="Container">
			<div className="content">
				<div className="login">

					<div className="loginContainer">
						<Button icon={<CaretLeftOutlined />} onClick={()=>{setRegisterClicked(false)}}/>

						<label>First Name</label>
						<input
							type="text"
							onChange={(e) => {
								setFirstNameReg(e.target.value);
							}}
							required
						/>
						<label>Surname</label>
						<input
							type="text"
							onChange={(e) => {
								setSurNameReg(e.target.value);
							}}
							required
						/>
						<label>Email</label>
						<input
							type="email"
							onChange={(e) => {
								setEmailReg(e.target.value);
							}}
							pattern="@$"
							required
						/>
						<label>Password</label>
						<input
							type="password"
							onChange={(e) => {
								setPasswordReg(e.target.value);
							}}
							required
						/>
						<label>Re-Enter Password</label>
						<input
							type="password"
							onChange={(e) => {
								setPasswordTwoReg(e.target.value);
							}}
							required
						/>
						<div className="buttonContainer">
							<button onClick={registerUser}>Register</button>
							<p id="loginStatus">{registerStatus}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
