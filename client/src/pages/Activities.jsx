import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import endpoint from "../helpers/endPoint";

const Activites = (props) => {
	const { state, onUpdate } = props;
	const [activity, setActivity] = useState(null);
	const [workout, setWorkout] = useState();
	const history = useHistory();

	useEffect(() => {
		Axios.get(`${endpoint()}/loadActivity`).then((response) => {
			//console.log(response.data);
			if (response.data) {
				console.log(response.data);
				let renderActiveDivs = response.data;
				renderActivities(renderActiveDivs);
			}
		});
		Axios.post(`${endpoint()}/loadworkoutdata`, {
			id: state.id,
		}).then((response) => {
			if (response.data) {
				console.log(response.data);
				let renderPrevWorkouts = response.data;
				renderPrev(renderPrevWorkouts);
			}
		});
	}, [state.id]);

	const renderActivities = (renderActiveDivs) => {
		let activNames = renderActiveDivs.map((activity) => (
			<a
				className="activityLinks"
				key={activity.id}
				href="/error"
				onClick={(e) => {
					passData(e, activity.activityName);
				}}
			>
				{activity.activityName}
			</a>
		));

		setActivity(activNames);
	};

	const renderPrev = (workouts) => {
		let prevWorouts = workouts.map((info) => (
			<div className="previousWorkouts" key={info.id}>
				{info.workoutname}
				<br /> Total Time: {info.totaltime}
				<br /> Calories: {info.calories}
				<br /> Avg Heart Rate: {info.avgheartrate}
				<br /> Location: {info.location}
			</div>
		));
		setWorkout(prevWorouts);
	};

	const passData = (e, activityName) => {
		e.preventDefault();
		console.log(activityName);
		history.push("/workouts", activityName);
	};

	return (
		<div className="ActivContainer">
			<div className="activities">
				<header>
					<h1>Activities</h1>
				</header>
				<div className="activityDivs">{activity}</div>
			</div>
			<div className="loadWorkoutData">
				<div className="workoutHeader">
					<header>
						<h2>Previous Workouts</h2>
					</header>
				</div>
				<div className="workoutDivs">{workout}</div>
			</div>
		</div>
	);
};

export default Activites;
