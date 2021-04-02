import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import getCovidData from '../helpers/getCovidData';
import test from '../helpers/test';
export default function CovidTracker() {
	const [location, setLocation] = useState("");
	const [covidData, setCovidData] = useState('');
	const [covidTable, setCovidTable] = useState();
	const getData= async()=>{
		const data = await getCovidData(location)
		console.log('data is again ', data)
		setCovidData(data)
	}
	console.log('covid data ', covidData);
	useEffect(()=>{
		if(!covidData){
			return;
		}
		mapInfo(covidData)
	},[covidData]);

	const mapInfo = (firstTen) => {
		console.log('calling map info')
		let mappedInfo = firstTen.map((data) => (
			<div className="covidData" key={data.date}>
				Date: {data.date} <br />
				Number of Cases: {data.cases.daily || 'No information!'} <br />
				Number of Deaths: {data.cases.deaths || 'No information!'}
			</div>
		));
		setCovidTable(mappedInfo);
	};
	return (
		<div>
			<div className="Container">
				<div className="covidData">
					<header>
						<h1>Coronavirus Tracking</h1>
						<h3>
							View Rates if new infection, deaths and overall impact of the
							virus in the UK
						</h3>
					</header>
					<div className="locationInput">
						<input
							type="text"
							placeholder="location..."
							onChange={(e) => {
								setLocation(e.target.value);
							}}
						/>
						<button onClick={getData}>Click</button>
					</div>
					<div className="loadedData">{covidTable}</div>
				</div>
			</div>
		</div>
	);
}
