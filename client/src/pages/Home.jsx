import React, {useEffect, useState} from "react";
import Login from './Login';
import _ from 'lodash'; 
import {useHistory } from "react-router-dom";
import Axios from "axios";


const Home=(props)=> {
	// here we should check if the user is already logged in
	// if they are - loggedIn should be set to true so that login doesn't render
	// the state should be populated with the users info
	const {onUpdate, state} = props;
	const history = useHistory();
	const [loginStatus, setLoginStatus] =useState(null);

	useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
			console.log('response was ', response);
            if (response.data.loggedIn == true) {
				console.log('logged in')
                setLoginStatus(response.data.user[0].firstname);
                history.push("/landing", { name: response.data.user[0].firstname });
            }
        });
    }, []);

		console.log('state is ', state)

	if(!state.loggedIn) {
		return (<Login state={state} onUpdate={onUpdate}/>)
	}
	else {
		return (
		<>
		<div className="Container">
			<div className="landingContainer">
				<div className="leftsideHeading">
					<h3>Welcome {loginStatus}</h3>
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
		</>
		);
	}
}
export default Home;
 