import Axios from 'axios';

async function getCovidData(location, setCovidData) {
    const filters = [
        `areaType=utla;`,
        //'date=2021-03-20'
        `areaName=${location}`,
    ];
    console.log('CALLING WITH LOCATION ', location)
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
    const data = [];
    let firstTen = [];
    try{
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
        firstTen.forEach((entry)=>{
            data.push({
                date: entry.date || 'N/A',
                dailyCases: entry.cases?.daily || 'N/A',
                dailyCasesCumulative: entry.cases.cumulative  || 'N/A',
                dailyDeaths: entry.deaths.daily || 'N/A',
            })
        })
        setCovidData(data)
        return data
    }catch(error){
        console.log('Error: ', error)
        return 404
    }
}
const getCovidAreas = async(setAllAreas)=>{
    const filters = [
        `areaType=utla;`,
        'date=2021-03-20'
    ];
    const structure = {
        date: "date",
        name: "areaName",
    };
    const apiParams =`filters=${filters}&structure=${JSON.stringify(structure)}`
    console.log(apiParams)
    const encodedParams = encodeURI(apiParams)
    let dataArray = []
    try{
        await fetch(
                `https://api.coronavirus.data.gov.uk/v1/data?${encodedParams}`
            ).then((response) =>
                response
                    .json()
                    .then((data) => ({
                        data: data,
                    }))
                    .then((res) => {
                        dataArray = res.data.data;
                    })
            );
        const areas = []
        dataArray.forEach((row)=>{
            areas.push(row.name)
        })
        console.log('areas ', areas)
        setAllAreas(areas)
    }catch(error){
        console.log('Error: ', error)
        return 404
    }
}
export {getCovidData, getCovidAreas};