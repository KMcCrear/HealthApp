//using this to populate the state with the user details
const updateOnLogin = (onUpdate, data) => {
	console.log("populating the state on logon", data);

	onUpdate({
		email: data?.email,
		id: data?.id,
		firstname: data?.firstname,
		surname: data?.surname,
		role: data?.role,
		message: `Welcome ${data?.firstname} ${data?.surname}!`,
		userLocation: data?.userLocation,
		loggedIn: true,
	});
};

export default updateOnLogin;
