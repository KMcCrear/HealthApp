import Axios from "axios";
const getData = async ( url ) => {

    //const { data, status, statusText } = await Axios.get(url, { timeout: 10000 });
    const data = await fetch(url).then((response)=>response.json().then((data) => ({
        data: data,
    }))
    .then((res) => {
        const dataArray = res.data.data;
        console.log('data is testing', dataArray)
        let firstTen = dataArray.slice(0, 10);
        return firstTen
    }))
    // if ( status >= 400 )
    //     throw new Error(statusText);
   // console.log('data is ', data)
    return data

};  // getData


const test = async ()=>{
    const endpoint = (
        'https://api.coronavirus.data.gov.uk/v1/data?' +
        'filters=areaType=utla;areaName=Glasgow city&' +
        'structure={"date":"date","code":"areaCode","name":"areaName","newCases":"newCasesByPublishDate"}'
    );
    


    const result = await getData(endpoint);
    console.log(result);


}
export default test;