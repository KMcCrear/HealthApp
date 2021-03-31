import React, { useState, useEffect } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import endpoint from "../helpers/endPoint";

export default function Profile(props) {
	const { state, onUpdate } = props;
	const [firstName, setFirstName] = useState(" ");
	const [surname, setSurname] = useState(" ");
	const [email, setEmail] = useState(" ");
	const [age, setAge] = useState(0);
	const [contact, setContact] = useState(0);
	const [gender, setGender] = useState(" ");
	const [bloodType, setBloodType] = useState(" ");
	const [isDiabetic, setDiabetic] = useState(" ");

	const data = {
		id: state.id,
		firstName: firstName,
		surName: surname,
		email: email,
		age: age,
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
					setFirstName(response.data.firstname);
					setSurname(response.data.surname);
					//setEmail(response.data.email);
					setAge(response.data.age);
					setContact(response.data.contact);
					setGender(response.data.gender);
					setBloodType(response.data.bloodtype);
					setDiabetic(response.data.isdiabetic);
				}
			}
		);
	}, [state.id]);

	const updataUserDetails = () => {
		Axios.post(`${endpoint()}/updateUserDetails`, data).then((response) => {
			if (response.data.error) {
				console.log(response.data.error);
				alert("Details Failed to Update");
			} else {
				alert("Details Successfully Updated");
			}
		});
	};
	return (
		<div className="profileContainer">
			<div className="profile">
				<div className="profHeader">
					<header>
						<h1>User Profile</h1>
					</header>
				</div>
				<div className="userProfile">
					<form>
						<TextField
							id="outlined-basic"
							variant="outlined"
							type="text"
							label="First Name"
							defaultValue={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<br />
						<TextField
							id="outlined-basic"
							variant="outlined"
							type="text"
							label="Surname Name"
							defaultValue={surname}
							onChange={(e) => setSurname(e.target.value)}
						/>
						<br />

						<TextField
							id="outlined-basic"
							variant="outlined"
							type="text"
							label="Email"
							pattern="@$"
							value={email}
							onChange={(e) => setEmail(e.target.value.trim())}
						/>
						<br />
						<TextField
							id="outlined-basic"
							variant="outlined"
							type="number"
							label="age"
							defaultValue={age}
							onChange={(e) => setAge(e.target.value)}
						/>
						<br />
						<TextField
							id="outlined-basic"
							variant="outlined"
							type="tel"
							label="Emergancy Contact"
							defaultValue={contact}
							onChange={(e) => setContact(e.target.value)}
						/>
						<br />
						<NativeSelect
							id="genderSelect"
							defaultValue={gender}
							onChange={(e) => setGender(e.target.value)}
						>
							<option defaultValue=""></option>
							<option>Male</option>
							<option>Female</option>
							<option>Other</option>
						</NativeSelect>
						<NativeSelect
							id="bloodTypeSelect"
							label="Blood Type"
							defaultValue={bloodType}
							onChange={(e) => setBloodType(e.target.value)}
						>
							<option defaultValue={bloodType}></option>
							<option>A+</option>
							<option>A-</option>
							<option>B+</option>
							<option>B-</option>
							<option>O+</option>
							<option>O-</option>
							<option>AB+</option>
							<option>AB-</option>
						</NativeSelect>
						<NativeSelect
							id="diabetic Select"
							label="Are you diabetic"
							defaultValue={isDiabetic}
							onChange={(e) => setDiabetic(e.target.value)}
						>
							<option defaultValue=""></option>
							<option>Type-1</option>
							<option>Type-2</option>
							<option>No</option>
						</NativeSelect>
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
	);
}
