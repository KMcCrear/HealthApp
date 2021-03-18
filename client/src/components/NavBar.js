import React, { useState } from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import { Link, useHistory } from "react-router-dom";

export default function NavBar() {
	const [showLinks, setShowLinks] = useState(false);
	return (
		<div>
			<div className="Navbar">
				<div className="leftSide">
					<div className="links" id={showLinks ? "hidden" : ""}>
						<a href="/home">Home</a>
						<a href="/profile">Profile</a>
						<a href="/aboutus">About us</a>
						<a href="/covidtracking">Covid-19</a>
					</div>
					<button onClick={() => setShowLinks(!showLinks)}>
						<ReorderIcon />
					</button>
				</div>
				<div className="rightSide"></div>
			</div>
		</div>
	);
}
