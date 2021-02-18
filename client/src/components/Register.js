import {React, useState} from 'react'
import ReorderIcon from '@material-ui/icons/Reorder';
import Axios from 'axios';
import {Link} from 'react-router-dom';


function Register() {

    const [showLinks, setShowLinks] = useState(false);

    const [firstNameReg, setFirstNameReg] = useState('');
    const [surNameReg, setSurNameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [passwordTwoReg, setPasswordTwoReg] = useState('');

    const registerUser = () => {
        Axios.post('http://localhost:3001/register',
        {
            firstname: firstNameReg, surname: surNameReg, email: emailReg, password: passwordReg
        }).then((response) => {
            console.log(response)
        });
    };


    return (
        <div className="Container">
            <div className="Navbar">
                <div className='leftSide'>
                    <div className="links" id={showLinks ? "hidden" : ""}>
                        <a href="/">Home</a>
                        <a href="/Profile">Profile</a>
                        <a href="/aboutus">About us</a>
                        <a href="/contact">Contact</a>
                    </div>
                    <button onClick={() => setShowLinks(!showLinks)}><ReorderIcon/></button>
                </div>
                <div className='rightSide'></div>
            </div>
            <div className="content">
                <div className="login">
                    <div className="loginContainer">
                    <label>First Name</label>
                    <input type="text" onChange={(e)=> {setFirstNameReg(e.target.value)}}/>
                    <label>Surname</label>
                    <input type="text" onChange={(e)=> {setSurNameReg(e.target.value)}}/>
                    <label>Email</label>
                    <input type="email" onChange={(e)=> {setEmailReg(e.target.value)}}/>
                    <label>Password</label>
                    <input type="password" onChange={(e)=> {setPasswordReg(e.target.value)}}/>
                    <label>Re-Enter Password</label>
                    <input type="password" onChange={(e)=> {setPasswordTwoReg(e.target.value)}}/>
                    <div className="buttonContainer">
                        <button onClick={registerUser}>Register</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
