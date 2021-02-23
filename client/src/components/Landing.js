import React from "react";
import { useLocation } from "react-router-dom";

import NavBar from "./NavBar";

export default function Landing() {
	const location = useLocation();

	const stringName = JSON.stringify(location.state);
	const user = JSON.parse(stringName);
	console.log(user.name);

	return (
		<div className="Container">
			<div>
				<NavBar />
			</div>
			<div className="landingContainer">
				<div className="leftsideHeading">
					<h3>Welcome {user.name}</h3>
				</div>
				<div className="excerciseActivities">
					<div className="activity">
						<div>
							<button>Activity 1</button>
						</div>
						<div>
							<button>Activity 2</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
