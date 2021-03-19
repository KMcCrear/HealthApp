import React from "react";
import { useLocation } from "react-router-dom";

const Activity = () => {
	const location = useLocation();

	return (
		<div className="Container">
			<div className="workoutHeader">
				<h1>Workouts</h1>
			</div>
			<div className="workoutDetails">
				<div>
					<h3>Add Workout:</h3>
				</div>
				<label>{location.state}</label>
				<form className="workoutForm">
					<label>Total Time: </label>
					<input type="time" />
					<label>Time: </label>
					<input type="time" />
					<label>Distance: </label>
					<input type="number" placeholder="In meters" />
					<label>Colories Burned: </label>
					<input type="number" />
					<label>Avg Heart Rate: </label>
					<input type="number" placeholder="bpm" />
					<label>Location: </label>
					<input type="text" placeholder="Location of workout" />
					<button>Submit Workout</button>
				</form>
			</div>
		</div>
	);
};

export default Activity;
