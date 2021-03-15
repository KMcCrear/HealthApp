import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import populateActivity from "../helpers/populateActivity";

const Activites = () => {
	const [activity, setActivity] = useState(null);
	const history = useHistory();

	useEffect(() => {
		Axios.get("http://localhost:3001/loadActivity").then((response) => {
			//console.log(response.data);
			if (response.data) {
				console.log(response.data);
				let renderActiveDivs = response.data;
				renderDivs(renderActiveDivs);
			}
		});
	}, []);

	const renderDivs = (renderActiveDivs) => {
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
		</div>
	);
};

export default Activites;
