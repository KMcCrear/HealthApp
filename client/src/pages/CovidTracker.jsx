import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function CovidTracker() {
	const [covidDate, setDate] = useState();
	const [newCases, setNewCases] = useState();
	const [location, setLocation] = useState("");
	const [covidData, setCovidData] = useState();

	async function getData() {
		if (location == "") {
			setDate("Please Enter a Valid Location");
		} else {
			await fetch(
				"https://api.coronavirus.data.gov.uk/v1/data?" +
					`filters=areaType=nation;areaName=${location}&` +
					'structure={"date":"date","newCases":"newCasesByPublishDate", "newCasesByPublishDate":"newCasesByPublishDate"}'
			).then((response) =>
				response
					.json()
					.then((data) => ({
						data: data,
					}))
					.then((res) => {
						const dataArray = res.data.data;
						let firstTen = dataArray.slice(0, 10);
						mapInfo(firstTen);
					})
			);
		}
	}

	const mapInfo = (firstTen) => {
		let mappedInfo = firstTen.map((data) => (
			<div className="covidData" key={data.date}>
				Data: {data.date} <br />
				Number of Cases: {data.newCases}
			</div>
		));
		setCovidData(mappedInfo);
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
					<div className="loadedData">{covidData}</div>
				</div>
			</div>
		</div>
	);
}
