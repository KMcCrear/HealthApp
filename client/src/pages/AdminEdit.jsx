import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import endpoint from "../helpers/endPoint";
import NativeSelect from "@material-ui/core/NativeSelect";

export default function AdminEdit() {
	const [workoutName, setActivityName] = useState();
	const [workoutToDelete, setWorkoutToDelete] = useState();
	const [workoutOptions, setWorkoutOptions] = useState("");

	const workoutData = {
		workoutName: workoutName,
	};

	const deleteData = {
		toDelete: workoutToDelete,
	};

	useEffect(() => {
		Axios.get(`${endpoint()}/load-workouts`).then((response) => {
			if (response.data.message) {
				alert("Error Loading Data");
			} else {
				mapWorkoutsToSelect(response.data);
			}
		});
	}, [workoutName]);

	const mapWorkoutsToSelect = (workouts) => {
		let mappedWorkouts = workouts.map((workout) => (
			<option key={workout.activityName}>{workout.activityName}</option>
		));
		setData(mappedWorkouts);
	};

	const setData = (mappedWorkouts) => {
		setWorkoutOptions(mappedWorkouts);
	};

	const addWorkout = () => {
		Axios.post(`${endpoint()}/addworkout`, workoutData).then((response) => {
			if (response.data.message) {
				alert("Error Adding new Workout");
			} else alert("New Workout Added Successfully");
		});
	};

	const deleteWokout = () => {
		Axios.post(`${endpoint()}/deleteworkout`, deleteData).then((response) => {
			if (response.data.message) {
				alert("Deletion Error");
			} else alert("Workout Successfully Deleted");
		});
	};

	return (
		<div className="adminContainer">
			<div className="adminPage">
				<div className="addWorkout">
					<div className="addHeader">
						<header>
							<h1>Add Workout</h1>
						</header>
					</div>
					<div className="inputWorkInfo">
						<form className="addWorkForm">
							<TextField
								id="outlined-basic"
								variant="outlined"
								type="text"
								label="Workout Name"
								onChange={(e) => setActivityName(e.target.value)}
							/>
							<br />
							<Button
								id="submitButton"
								color="primary"
								varient="contained"
								onClick={addWorkout}
							>
								Add Workout
							</Button>
						</form>
					</div>
				</div>
				<div className="deleteWorkout">
					<div className="deleteHeader">
						<header>
							<h1>Delete Workout</h1>
						</header>
					</div>
					<div className="delteWorkoutForm">
						<form className="deleteForm">
							<NativeSelect
								label="Workout Name"
								id="deleteSelect"
								onChange={(e) => setWorkoutToDelete(e.target.value)}
							>
								<option defaultValue=""></option>
								{workoutOptions}
							</NativeSelect>
							<br />
							<Button
								id="submitButton"
								color="primary"
								varient="contained"
								onClick={deleteWokout}
							>
								Delete Workout
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
