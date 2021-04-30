import React, { useState, useEffect } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import {Button} from "antd";
import Axios from "axios";
import endpoint from "../helpers/endPoint";
import updateOnLogin from "../helpers/updateOnLogin";

export default function Profile(props) {
	const { state, onUpdate } = props;
	const [age, setAge] = useState();
	const [contact, setContact] = useState();
	const [gender, setGender] = useState();
	const [bloodType, setBloodType] = useState();
	const [isDiabetic, setDiabetic] = useState();
	const [disability, setDisability] = useState();
	const [weight, setWeight] = useState();
	const [height, setHeight] = useState();

	const [userDetails, setUserDetails] = useState();
	
	const data = {
		id: state.id,
		firstName: state.firstname,
		surName: state.surname,
		email: state.email,
		age: age,
		height: height,
		weight: weight,
		emergeContact: contact,
		gender: gender,
		bloodType: bloodType,
		isDiabetic: isDiabetic,
	};

	useEffect(() => {
		Axios.post(`${endpoint()}/getUserDetails`, { id: state.id }).then(
			(response) => {
				if (response.data.message) {
					alert("Error Loading User Details");
				} else {
					console.log(response.data);
					let userData = response.data;
					displayUserData(userData);
				}
			}
		);
	}, [state.id]);

	const updataUserDetails = () => {
		if (!state.firstname || !state.surname || !state.email) {
			alert("Error! Firstname, Surname and Email Can't be Empty");
		} else {
			//updateOnLogin(onUpdate, data);
			Axios.post(`${endpoint()}/updateUserDetails`, data).then((response) => {
				if (response.data.error) {
					console.log(response.data.error);
					alert("Details Failed to Update");
				} else {
					alert("Details Successfully Updated");
				}
			});
		}
	};

	const displayUserData = (userData) => {
		let mappedUserData = userData.map((user) => (
			<div className="currentUserData" key={user.id}>
				<fieldset>
					<TextField
						InputProps={{
								className: "inputField",
						}}						
						id="outlined-basic"
						variant="outlined"
						type="text"
						label="Firstname"
						disabled={true}
						defaultValue={state.firstname}
					/>
					<br />
					<br />
					<TextField
						InputProps={{
							className: "inputField",
						}}						
						id="outlined-basic"
						variant="outlined"
						type="text"
						label="Surname"
						disabled={true}
						defaultValue={state.surname}
					/>
					<br />
					<br />
					<TextField
						InputProps={{
							className: "inputField",
						}}							
						id="outlined-basic"
						variant="outlined"
						type="text"
						label="Email"
						disabled={true}
						defaultValue={state.email}
					/>
					<br />
					<br />
					<TextField
						InputProps={{
							className: "inputField",
						}}							
						id="outlined-basic"
						variant="outlined"
						type="text"
						label="Age"
						disabled={true}
						defaultValue={user.age}
					/>
					<br />
					<br />
					<TextField
						InputProps={{
							className: "inputField",
						}}	
						id="outlined-basic"
						variant="outlined"
						type="text"
						label="Emergency Contact"
						disabled={true}
						defaultValue={user.contact}
					/>
					<br />
					<br />
					<TextField
						InputProps={{
							className: "inputField",
						}}	
						id="outlined-basic"
						variant="outlined"
						type="text"
						label="Gender"
						disabled={true}
						defaultValue={user.gender}
					/>
					<br />
					<br />
					<TextField
						InputProps={{
							className: "inputField",
						}}						
						id="outlined-basic"
						variant="outlined"
						type="text"
						label="Blood Type"
						disabled={true}
						defaultValue={user.bloodtype}
					/>
					<br />
					<br />
					<TextField
						InputProps={{
							className: "inputField",
						}}	
						id="outlined-basic"
						variant="outlined"
						type="text"
						label="Diabetic"
						disabled={true}
						defaultValue={user.isdiabetic}
					/>
					<br />
				</fieldset>
			</div>
		));
		setUserDetails(mappedUserData);
	};

	return (
		<div class='page'>
		<div className="profileContainer">
			<div className="profile">
				<div className="profHeader">
					<header>
						<h1 class='title'>User Profile</h1>
					</header>
				</div>
				<div className="loadedUserDetails">
					<h3>Current Health Details</h3>
					{userDetails}
				</div>
				<div className="userProfile">
					<h3>Update Details</h3>
					<form>
						<TextField
							InputProps={{
								className: "inputField",
							}}							
							id="outlined-basic"
							variant="outlined"
							type="text"
							label="First Name"
							onChange={(e) => onUpdate({ firstname: e.target.value })}
						/>
						<br />
						<br />
						<TextField
							InputProps={{
								className: "inputField",
							}}							
							id="outlined-basic"
							variant="outlined"
							type="text"
							label="Surname"
							onChange={(e) => onUpdate({ surname: e.target.value })}
						/>
						<br />
						<br />
						<TextField
							InputProps={{
								className: "inputField",
							}}
							id="outlined-basic"
							variant="outlined"
							type="text"
							label="Email"
							pattern="@$"
							onChange={(e) => onUpdate({ email: e.target.value })}
						/>
						<br />
						<br />
						<TextField
							InputProps={{
								className: "inputField",
								min: 0
							}}
							id="outlined-basic"
							variant="outlined"
							min
							type="number"
							label="age"
							onChange={(e) => setAge(e.target.value)}
						/>
						<br />
						<br />
						<TextField
							InputProps={{
								className: "inputField",
							}}							
							id="outlined-basic"
							variant="outlined"
							type="text"
							label="Height (cm)"
							onChange={(e) => setHeight(e.target.value)}
						/>
						<br />
						<br />
						<TextField
							InputProps={{
								className: "inputField",
							}}							
							id="outlined-basic"
							variant="outlined"
							type="text"
							label="Weight (kg)"
							onChange={(e) => setWeight(e.target.value)}
						/>
						<br />
						<br />
						<TextField
							InputProps={{
								className: "inputField",
							}}							
							id="outlined-basic"
							variant="outlined"
							type="tel"
							label="Emergency Contact"
							defaultValue={contact}
							onChange={(e) => setContact(e.target.value)}
						/>
						<br />
						<br />
						<NativeSelect
							className="inputField"
							id="genderSelect"
							onChange={(e) => setGender(e.target.value)}
						>
							<option defaultValue="">Select Gender</option>
							<option>Male</option>
							<option>Female</option>
							<option>Other</option>
						</NativeSelect>
						<br />
						<br />
						<NativeSelect
							className="inputField"
							id="disability"
							label="Do You have a Disability?"
							onChange={(e) => setDisability(e.target.value)}
						>
							<option defaultValue="">Do you have a Disability</option>
							<option>Yes</option>
							<option>No</option>
						</NativeSelect>
						<br />
						<br />
						<NativeSelect
							className="inputField"
							id="bloodTypeSelect"
							label="Blood Type"
							onChange={(e) => setBloodType(e.target.value)}
						>
							<option defaultValue={bloodType}>Select Blood Type</option>
							<option>A+</option>
							<option>A-</option>
							<option>B+</option>
							<option>B-</option>
							<option>O+</option>
							<option>O-</option>
							<option>AB+</option>
							<option>AB-</option>
						</NativeSelect>
						<br />
						<br />
						<NativeSelect
							className="inputField"
							id="diabetic Select"
							label="Are you diabetic"
							onChange={(e) => setDiabetic(e.target.value)}
						>
							<option defaultValue="">Are you Diabetic?</option>
							<option>Type-1</option>
							<option>Type-2</option>
							<option>No</option>
						</NativeSelect>
						<br />
						<br />
						<Button
							id="submitButton"
							color="primary"
							varient="contained"
							onClick={updataUserDetails}
						>
							Update Details
						</Button>
					</form>
				</div>
			</div>
		</div>
		</div>
	);
}
