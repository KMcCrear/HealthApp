//using this to populate the state with the user details
const updateOnLogin = (onUpdate, data) =>{
    console.log('populating the state on logon');
    onUpdate({email: data?.email,
            id: data?.id,
            firstname: data?.firstname,
            surname: data?.surname,
            message: `Welcome ${data?.firstname} ${data?.surname}!`,
            loggedIn: true,
    });
}

export default updateOnLogin;