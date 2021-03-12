//using this to populate the state with the user details
const populateState = (onUpdate, data) =>{
    onUpdate({email: data.email,
            firstname: data.firstname,
            surname: data.surname,
            message: `Welcome ${data.firstname} ${data.surname}!`,
            loggedIn: true,
    });
}

export default populateState;