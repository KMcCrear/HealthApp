import Axios from 'axios';

async function getCovidData(location) {
    const filters = [
        `areaType=utla;`,
        `areaName=${location}`,
    ];
    const structure = {
        date: "date",
        name: "areaName",
        cases: {
            daily: "newCasesByPublishDate",
            cumulative: "cumCasesByPublishDate",
        },
        deaths: {
            daily: "newDeathsByDeathDate",
            cumulative: "cumDeathsByDeathDate",
        }
    };

    // 'https://api.coronavirus.data.gov.uk/v1/data?' +
    // 'filters=areaType=utla;areaName=Glasgow city&' +
    // 'structure={"date":"date","code":"areaCode","name":"areaName","newCases":"newCasesByPublishDate"}'
    const apiParams =`filters=${filters}&structure=${JSON.stringify(structure)}`
    console.log(apiParams)
    const encodedParams = encodeURI(apiParams)
    let firstTen = {};
   await fetch(
        `https://api.coronavirus.data.gov.uk/v1/data?${encodedParams}`
    ).then((response) =>
        response
             .json()
            .then((data) => ({
                data: data,
            }))
            .then((res) => {
                const dataArray = res.data.data;
                console.log('data is ', dataArray)
                firstTen = dataArray.slice(0, 10);
            })
    );
    return firstTen
}

export default getCovidData;