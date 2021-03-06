import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import Axios from "axios";
import ReorderIcon from "@material-ui/icons/Reorder";
import { Link, useHistory } from "react-router-dom";
import { Typography, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import basicUserImage from "../static/icon-user-default.png";
import endpoint from "../helpers/endPoint";
function NavBar(props) {
	const [showLinks, setShowLinks] = useState(false);
	const [showAdmin, setShowAdmin] = useState();
	const { state, onUpdate } = props;
	function logout() {
		Axios.put(`${endpoint()}/logout`).then((response) => console.log(response));
		window.location.reload(false);
	}

	useEffect(() => {
		if (state.role == "admin") {
			setShowAdmin(<a href="/adminedit">Admin</a>);
		} else setShowAdmin("");
	}, [state.role]);

	return (
		<div>
			<div className="Navbar">
				<div className="leftSide">
					<div className="links" id={showLinks ? "hidden" : ""}>
						<a href="/home">Home</a>
						<a href="/activities">Activities</a>
						<a href="/profile">Profile</a>
						{showAdmin}
					</div>
					
					<button onClick={() => setShowLinks(!showLinks)}>
						<ReorderIcon />
					</button>
				</div>
				<div className="rightSide">
					<a href="/profile" className="profilePage">
						<img src={basicUserImage} alt="user" />
						<span
							style={{
								position: "relative",
								color: "black",
								left: "81%",
								bottom: "15%",
								"font-weight": "bold",
								"font-size": "130%",
							}}
							id="username"
						>
							{`${state.firstname} ${state.surname}`}
						</span>
					</a>
					<Button
						id="logoutButton"
						size="small"
						shape="round"
						icon={<LogoutOutlined />}
						onClick={logout}
					>
						Log out
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
