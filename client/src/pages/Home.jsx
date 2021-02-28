import React from "react";
import Login from './Login';
import _ from 'lodash'; 

class Home extends React.Component {
	// here we should check if the user is already logged in
	// if they are - loggedIn should be set to true so that login doesn't render
	// the state should be populated with the users info
	constructor(props){
		super(props);
		this.defaultState= {
			loggedIn: false,
			username: null,
			email: null,
			firstname: null,
			surname: null,
			message: null,
		}

		this.state ={
			state: _.cloneDeep(this.defaultState),
		}
		this.updateState = this.updateState.bind(this)
	}
	updateState(object){
		this.setState((prevState) => {
			const newState = _.cloneDeep(prevState);
	  
			_.merge(newState.config, object);
	  
			return newState;
		  });
	}
	render(){		
		const {state}=this.state;
		console.log('state is ', state);

		this.updateState({email:'can you be changed pls'});
		console.log('state is ', state);
		if(!this.state.loggedIn) {
			return (<Login state={state} updateState={this.updateState}/>)
		}
		else {
			return (
			<>
			<div className="Container">
				<div className="landingContainer">
					<div className="leftsideHeading">
						<h3>Welcome {state.username}</h3>
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
 