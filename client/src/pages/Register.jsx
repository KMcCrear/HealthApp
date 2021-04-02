import { React, useState } from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import Axios from "axios";
import {Button } from 'antd';
import {CaretLeftOutlined } from '@ant-design/icons';
import updateOnLogin from '../helpers/updateOnLogin';
import endpoint from '../helpers/endPoint';

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
			const data ={
				firstname: firstNameReg,
				surname: surNameReg,
				email: emailReg,
				password: passwordTwoReg
			}
			Axios.post(`${endpoint()}/register`, data).then((response) => {
				if (response.data.message) {
					setRegisterStatus(response.data.message);
				} else {
					console.log('data is ', data);
					setRegisterStatus("Welcome Registration Successful");
					//updateOnLogin(onUpdate, data);
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
