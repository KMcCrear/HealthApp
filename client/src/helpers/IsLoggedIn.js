import { useEffect } from "react";
import {useHistory } from "react-router-dom";
import Axios from "axios";

	/* Checks to see if the user is logged in i.e. via the cookie and 
	sends them to the home page. */

const IsLoggedIn = () =>{
   // const history = useHistory();
    Axios.get("http://localhost:3001/login").then((response) => {
        console.log('response is ', response)
        if (response.data.loggedIn == true) {
            console.log('user is logged in');
            //setLoginStatus(response.data.user[0].firstname);
            return true;
            //history.push("/landing", { name: response.data.user[0].firstname });
        }
        return false;
    });
}
export default IsLoggedIn;
