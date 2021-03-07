import React from "react";
import Login from './Login';
import _ from 'lodash'; 

class Home extends React.Component {
	// here we should check if the user is already logged in
	// if they are - loggedIn should be set to true so that login doesn't render
	// the state should be populated with the users info
	constructor(props){
		super(props);
		this.state= {
			loggedIn: false,
			email: null,
			firstname: null,
			surname: null,
			message: null,
		}
	}
	onUpdate(object){
		console.log('in on update', object)
		this.setState(object);
	}
	render(){		
		console.log('state is ', this.state)

		if(!this.state.loggedIn) {
			return (<Login state={this.state} onUpdate={this.onUpdate.bind(this)}/>)
		}
		else {
			return (
			<>
			<div className="Container">
				<div className="landingContainer">
					<div className="leftsideHeading">
						<h3>Welcome {this.state.firstname}</h3>
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
}
export default Home;
 