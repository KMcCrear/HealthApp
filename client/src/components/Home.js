import React, {useState} from 'react';
import ReorderIcon from '@material-ui/icons/Reorder';
import {Link, useHistory} from 'react-router-dom';
import Axios from 'axios';

function Home() {
    const history = useHistory();

    const [showLinks, setShowLinks] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const login = () => {
        Axios.post('http://localhost:3001/login',
        {
            email: email, password: password
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(
                    'Welcome ' + response.data[0].firstname +
                    ' ' + response.data[0].surname
                    );
                    if (response.data[0].role == 'user') {
                        history.push('/test');
                    }
            }
        });
    };

    return (
        <div className="Container">
            <div className="Navbar">
                <div className='leftSide'>
                    <div className="links" id={showLinks ? "hidden" : ""}>
                        <a href="/Home.js">Home</a>
                        <a href="/Profile">Profile</a>
                        <a href="/aboutus">About us</a>
                        <a href="/contact">Contact</a>
                    </div>
                    <button onClick={() => setShowLinks(!showLinks)}><ReorderIcon/></button>
                </div>
                <div className='rightSide'></div>
            </div>
            <div className="content">
                <div className="header">
                    <h1>Welcome to GCU Health</h1>
                    <p>The health App that helps you keep track</p>
                </div>
                <div className="login">
                    <div className="loginContainer">
                    <label>Email</label>
                    <input type="email" onChange={(e)=> {setEmail(e.target.value)}}/>
                    <label>Password</label>
                    <input type="password" onChange={(e)=> {setPassword(e.target.value)}}/>
                    <div className="buttonContainer">
                        <button onClick={login}>Login</button>
                        <p>Don't have an account? register <span><Link to={"/register"}>here</Link></span></p>
                        <p id="loginStatus">{loginStatus}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home