import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import endpoint from "../helpers/endPoint";
import { useState } from "react";
import Button from "@material-ui/core/Button";

const Activity = (props) => {
	const location = useLocation();
	const { state, onUpdate } = props;
	const [totalTime, setTotalTime] = useState();
	const [distance, setDistance] = useState();
	const [caloriesBurned, setCaloriesBurned] = useState();
	const [avgHeartRate, setHeartRate] = useState();
	const [locationOfWorkout, setLocation] = useState();

	const workoutName = location.state;

	const data = {
		id: state.id,
		workoutName: workoutName,
		totalTime: totalTime,
		distance: distance,
		calories: caloriesBurned,
		heartRate: avgHeartRate,
		location: locationOfWorkout,
	};

	const submitWorkout = (e) => {
		e.preventDefault();
		Axios.post(`${endpoint()}/submitworkout`, data).then((response) => {
			if (response.data.message) {
				alert("Error Submitting Workout");
			} else {
				alert("Workout Submitted");
			}
		});
	};

	return (
		<div className="Container">
			<div className="workoutHeader">
				<h1>Workouts</h1>
			</div>
			<div className="workoutDetails">
				<div>
					<h3>Add Workout:</h3>
				</div>
				<label>{workoutName}</label>
				<form className="workoutForm">
					<label>Total Time: </label>
					<input type="time" onChange={(e) => setTotalTime(e.target.value)} />
					<label>Distance: </label>
					<input
						type="number"
						placeholder="In meters"
						onChange={(e) => setDistance(e.target.value)}
					/>
					<label>Colories Burned: </label>
					<input
						type="number"
						onChange={(e) => setCaloriesBurned(e.target.value)}
					/>
					<label>Avg Heart Rate: </label>
					<input
						type="number"
						placeholder="bpm"
						onChange={(e) => setHeartRate(e.target.value)}
					/>
					<label>Location: </label>
					<input
						type="text"
						placeholder="Location of workout"
						onChange={(e) => setLocation(e.target.value)}
					/>
					<Button varient="contained" onClick={submitWorkout}>
						Submit Workout
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Activity;
