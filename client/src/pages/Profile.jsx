import React, { useEffect, useState } from "react";
import Axios from "axios";
import endpoint from "../helpers/endPoint";

const Profile = (props) => {
  const [userAge, setUserAge] = useState(null);
  const [userSex, setUserSex] = useState(null);

  const [userHeight, setUserHeight] = useState(null);
  const [userWeight, setUserWeight] = useState(null);

  const [userBloodType, setUserBloodType] = useState(null);
  const [userBloodPressure, setUserBloodPressure] = useState(null);

  const [userDiabetic, setUserDiabetic] = useState(null);
  const [userDisabilities, setUserDisabilites] = useState(null);

  const [profdata, setProfData] = useState(null);

  const { onUpdate, state } = props;

  useEffect(() => {
    if (!state.id) {
      return;
    }
    console.log("getting the data for the user", state.id);
    Axios.get(`${endpoint()}/profile`, {
      params: {
        userId: state.id,
        firstname: state.firstname,
        surname: state.surname,
        email: state.email,
      },
    }).then((response) => {
      if (response.data) {
        console.log(response.data);
        let prof = response.data;
        mapData(prof);
      }
    });
  }, [state.id]);

  const enterData = () => {
    const data = {
      userId: state.id,
      age: userAge,
      sex: userSex,
      height: userHeight,
      weight: userWeight,
      bloodtype: userBloodType,
      bloodpressure: userBloodPressure,
      diabetic: userDiabetic,
      disabilities: userDisabilities,
    };

    Axios.post(`${endpoint()}/profile`, data);
  };

  const mapData = (prof) => {
    let Data = prof.map((profdata) => (
      <div className="Profile" key={profdata.id}>
        <label id="label">First Name: {state.firstname} </label>
        <label id="label">Surname: {state.surname} </label>
        <label id="label">Email: {state.email} </label>
        <label id="label">Age: {profdata.Age} </label>
        <label id="label">Gender: {profdata.Sex} </label>
        <label id="label">Height(cm): {profdata.Height} </label>
        <label id="label">Weight(kg): {profdata.Weight} </label>
        <label id="label">BloodType: {profdata.BloodType} </label>
        <label id="label">BloodPressure(mmHg): {profdata.BloodPressure} </label>
        <label id="label">Diabetic: {profdata.Diabetic} </label>
        <label id="label">Disabilities: {profdata.Disabilities} </label>
      </div>
    ));
    setProfData(Data);
  };

  const update = () => {
    var details = document.getElementById("Show");

    if (details.style.display === "none") {
      details.style.display = "block";
    } else {
      details.style.display = "none";
    }
  };

  return (
    <div className="Container">
      <div>
        <div>{profdata}</div>
        <div id="AdditionalInformation">
          <label>Age: </label>
          <input
            type="text"
            name="Age"
            onChange={(e) => {
              setUserAge(e.target.value);
            }}
          />
          <br></br>
          <label>Gender: </label>
          <input
            type="text"
            name="Gender"
            onChange={(e) => {
              setUserSex(e.target.value);
            }}
          />{" "}
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
          <input
            type="text"
            onChange={(e) => {
              setUserBloodType(e.target.value);
            }}
          />
          <br></br>
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
            type="text"
            name="Diabetic"
            onChange={(e) => {
              setUserDiabetic(e.target.value);
            }}
          />{" "}
          <br></br>
          <label>Do you have any Disabilities, If yes state disability: </label>
          <input
            type="text"
            name="Disabilities"
            onChange={(e) => {
              setUserDisabilites(e.target.value);
            }}
          />
        </div>
        <br></br>
        <div className="buttonContainer">
          <button onClick={enterData} id="SaveButton">
            SAVE
          </button>
        </div>
        <div className="buttonContainer">
          <button onclick={update} id="UpdateButton">
            Update Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
