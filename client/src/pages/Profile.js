import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import Axios from "axios";
import NavBar from "../components/NavBar";
import { Apps } from "@material-ui/icons";

function Profile() {
  const history = useHistory();

  const [emailUser, setEmailUser] = useState("");
  const [firstNameUser, setFirstNameUser] = useState("");
  const [surNameUser, setSurNameUser] = useState("");

  const [userAge, setUserAge] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [userBloodType, setuserBloodType] = useState("");
  const [userBloodPressure, setUserBloodPressure] = useState("");
  const [userDiabetic, setUserDiabetic] = useState("");
  const [userDisabilities, setUserDisabilites] = useState("");

  Axios.defaults.withCredentials = true;

  const getData = () => {
    Axios.get("http://localhost:3001/profile", {
      firstname: firstNameUser,
      surname: surNameUser,
      email: emailUser,
    }).then((response) => {
      if (response.data.loggedIn == true) {
        setFirstNameUser(response.data.user[0].firstname);
        setSurNameUser(response.data.user[0].surname);
        setEmailUser(response.data.user[0].email);
      }
    });
  };

  /*useEffect(() => {
    Axios.get("http://localhost:3001/proile").then((response) => {
      if (response.data.loggedIn == true) {
        setFirstNameUser(response.data.user[0].firstname);
        setSurNameUser(response.data.user[0].surname);
        setEmailUser(response.data.user[0].email);
      }
    });
  });*/

  const enterData = () => {
    Axios.post("http://localhost:3001/profile", {
      age: userAge,
      sex: userSex,
      height: userHeight,
      weight: userWeight,
      bloodtype: userBloodType,
      bloodpressure: userBloodPressure,
      diabetic: userDiabetic,
      disabilities: userDisabilities,
    });
  };

  return (
    <div className="Container">
      <div>
        <NavBar />
      </div>
      <div>
        <div className="Profile">
          <label>First Name: {firstNameUser} </label>
          <label>Surname: {surNameUser} </label>
          <label>Email: {emailUser} </label>
        </div>
        <div className="Additional Information">
          <label>Age: </label>
          <input
            type="number"
            name="Age"
            min="15"
            max="100"
            onChange={(e) => {
              setUserAge(e.target.value);
            }}
          />
          <label>Gender: </label>
          <input
            type="radio"
            name="Gender"
            value="male"
            onChange={(e) => {
              setUserSex(e.target.value);
            }}
          />{" "}
          <label for="male">Male</label>
          <br></br>
          <input
            type="radio"
            name="Gender"
            value="female"
            onChange={(e) => {
              setUserSex(e.target.value);
            }}
          />{" "}
          <label for="female">Female</label>
          <br></br>
          <input
            type="radio"
            name="Gender"
            value="other"
            onChange={(e) => {
              setUserSex(e.target.value);
            }}
          />{" "}
          <label for="other">Other</label>
          <br></br>
          <label>Height: </label>
          <input
            type="text"
            name="Height"
            onChange={(e) => {
              setUserHeight(e.target.value);
            }}
          />
          <label for="cm">cm</label>
          <br></br>
          <label>Weight: </label>
          <input
            type="text"
            name="Weight"
            onChange={(e) => {
              setUserWeight(e.target.value);
            }}
          />
          <label for="kg">kg</label>
          <br></br>
          <label for="bloodtype">Blood Type: </label>
          <select id="bloodtype" name="Bloodtype">
            <option
              value="A"
              onChange={(e) => {
                setuserBloodType(e.target.value);
              }}
            >
              A
            </option>
            <option
              value="B"
              onChange={(e) => {
                setuserBloodType(e.target.value);
              }}
            >
              B
            </option>
            <option
              value="O"
              onChange={(e) => {
                setuserBloodType(e.target.value);
              }}
            >
              O
            </option>
            <option
              value="AB"
              onChange={(e) => {
                setuserBloodType(e.target.value);
              }}
            >
              AB
            </option>
          </select>
          <label>Blood Pressure: </label>
          <input
            type="text"
            name="BloodPressure"
            onChange={(e) => {
              setUserBloodPressure(e.target.value);
            }}
          />
          <label for="mmHg">mmHg</label>
          <br></br>
          <label>Are you Diabetic: </label>
          <input
            type="radio"
            name="Diabetic"
            value="Yes"
            onChange={(e) => {
              setUserDiabetic(e.target.value);
            }}
          />{" "}
          <label for="Yes">Yes</label>
          <br></br>
          <input
            type="radio"
            name="Diabetic"
            value="No"
            onChange={(e) => {
              setUserDiabetic(e.target.value);
            }}
          />{" "}
          <label for="No">No</label>
          <br></br>
          <label>Do you have any Disabilities, if yes state disability: </label>
          <input
            type="text"
            name="Disabilities"
            onChange={(e) => {
              setUserDisabilites(e.target.value);
            }}
          />
          <br></br>
          <input
            type="radio"
            name="Disabilities"
            value="No"
            onChange={(e) => {
              setUserDisabilites(e.target.value);
            }}
          />{" "}
          <label for="No">No</label>
          <br></br>
        </div>
        <div className="buttonContainer">
          <button onClick={enterData}>SAVE</button>
        </div>
        <div className="buttonContainer">
          <button onClick={getData}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
