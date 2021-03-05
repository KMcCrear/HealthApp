import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function CovidTracker() {
	const [covidData, setCovidData] = useState();
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");

	const getCovidData = () => {
		Axios.get(
			"https://api.coronavirus.data.gov.uk/v1/data?" +
				`filters=areaType=nation;areaName=${location}&` +
				'structure={"date":"date","newCases":"newCasesByPublishDate"}'
		)
			.then((response) => setCovidData(response.data))
			.catch((error) => console.error(error));
	};

	async function getData() {
		const response = await fetch(
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
					setCovidData(res.data);
				})
		);
	}

	return (
		<div>
			<div>
				<input type="text" onChange={(e) => setLocation(e.target.value)} />
				<button onClick={getData}>click</button>
				<p>{JSON.stringify(covidData)}</p>
				<p>test</p>
			</div>
		</div>
	);
}
