import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function CovidTracker() {
	const [covidDate, setDate] = useState();
	const [newCases, setNewCases] = useState();
	const [location, setLocation] = useState("");

	async function getData() {
		if (location == "") {
			setDate("Please Enter a Valid Location");
		} else {
			await fetch(
				"https://api.coronavirus.data.gov.uk/v1/data?" +
					`filters=areaType=nation;areaName=${location}&` +
					'structure={"date":"date","newCases":"newCasesByPublishDate"}'
			).then((response) =>
				response
					.json()
					.then((data) => ({
						data: data,
					}))
					.then((res) => {
						const dataArray = res.data.data;
						setDate(dataArray[0].date);
						setNewCases(dataArray[0].newCases);
					})
			);
		}
	}

	return (
		<div>
			<div className="Container">
				<header>
					<h1>Coronavirus Tracking</h1>
					<h3>
						View Rates if new infection, deaths and overall impact of the virus
						in the UK
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
				<div className="loadedData">
					<form>
						<label>Date: </label>
						<p>{covidDate}</p>
						<label>New Cases: </label>
						<p>{newCases}</p>
					</form>
				</div>
			</div>
			{/* <div className="Container">
				<div>
					<header className="covidHeader">
						<h1>Coronavirus Tracking</h1>
						<h3>
							View Rates if new infection, deaths and overall impact of the
							virus in the UK
						</h3>
					</header>
				</div>
				<div className="locationInput">
					<form>
						<input
							type="text"
							placeholder="Location..."
							onChange={(e) => {
								setLocation(e.target.value);
							}}
						/>
						<button onClick={getData}>Search</button>
					</form>
				</div>
				<div className="loadCovidData">
					<form>
						<label>Date: </label>
						<p>{covidDate}</p>
						<label>New Cases: </label>
						<p>{newCases}</p>
					</form>
				</div>
			</div> */}
		</div>
	);
}
