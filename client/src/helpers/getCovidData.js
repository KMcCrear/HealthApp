import Axios from 'axios';

async function getCovidData(location, setCovidData) {
    const filters = [
        `areaType=utla;`,
        //'date=2021-03-20'
        `areaName=${location}`,
    ];

    const structure = {
        date: "date",
        name: "areaName",
        dailyCases: "newCasesByPublishDate",
        cumulativeCases: "cumCasesByPublishDate",
        dailyDeaths: "newDeathsByDeathDate",
        cumulativeDeaths: "cumDeathsByDeathDate",        
    };

    // 'https://api.coronavirus.data.gov.uk/v1/data?' +
    // 'filters=areaType=utla;areaName=Glasgow city&' +
    // 'structure={"date":"date","code":"areaCode","name":"areaName","newCases":"newCasesByPublishDate"}'
    const apiParams =`filters=${filters}&structure=${JSON.stringify(structure)}`
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
                        firstTen = dataArray.slice(0, 10);
                    })
            );
        const covidValue = (value)=>{
            if(value==='undefined' || value===null){
                return 'N/A'
            }
            return value;
        }
        firstTen.forEach((entry)=>{
            data.push({
                date: covidValue(entry.date),
                dailyCases: covidValue(entry.dailyCases),
                casesCumulative: covidValue(entry.cumulativeCases),
                dailyDeaths: covidValue(entry.dailyDeaths),
                cumulativeDeaths: covidValue(entry.cumulativeDeaths) 
            })
        })
        setCovidData(data)
        return data
    }catch(error){
        console.log('Error: ', error)
        return 404
    }
}

function getYesterdayDateFormatted() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const getCovidAreas = async(setAllAreas)=>{
    //this returns all the areas with covid data available in the uk
    
    const yesterdayDate = getYesterdayDateFormatted();

    let dataArray = []
    const endpoint = (
        'https://api.coronavirus.data.gov.uk/v1/data?' +
        `filters=areaType=utla;date=${yesterdayDate}&` +
        'structure={"date":"date","newCases":"newCasesByPublishDate","name":"areaName"}'
    );
        console.log("endpoint is ", endpoint);
        try{
        await fetch(
                endpoint
            ).then((response) =>
                response.json()
                    .then((data) => {
                        data.data.forEach((row)=>dataArray.push(row.name))
                    })
                   
            );

        setAllAreas(dataArray)
    }catch(error){
        console.log('Error: ', error)
        return 404
    }
}
export {getCovidData, getCovidAreas};