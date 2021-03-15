import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import populateActivity from "../helpers/populateActivity";

const Activites = () => {
	const [activity, setActivity] = useState(null);

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
		let something = renderActiveDivs.map(
			(activity) => (
				populateActivity(activity.activityName),
				(
					<a className="activityLinks" key={activity.id} href="/">
						{activity.activityName}
					</a>
				)
			)
		);

		setActivity(something);
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
