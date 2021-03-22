import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import endpoint from "../helpers/endPoint";

const Activites = (props) => {
	const { state, onUpdate } = props;
	const [activity, setActivity] = useState(null);
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

	const passData = (e, activityName) => {
		e.preventDefault();
		console.log(activityName);
		history.push("/workouts", activityName);
	};

	return (
		<div className="Container">
			<div className="activities">
				<h1>Activities</h1>
				<div className="activityDivs">{activity}</div>
			</div>
			<div className="loadWorkoutData">
				<h2>Previous Workouts</h2>
			</div>
		</div>
	);
};

export default Activites;
