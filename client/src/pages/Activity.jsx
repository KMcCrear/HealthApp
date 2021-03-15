import React from "react";
import { useLocation } from "react-router-dom";

const Activity = () => {
	const location = useLocation();

	return (
		<div className="Container">
			<div>Excercise: {location.state}</div>
		</div>
	);
};

export default Activity;
