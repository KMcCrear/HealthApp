import React from 'react';
import {Table} from 'antd';
const CovidTable = (props)=>{
    const {data, state} = props;
    const tableColumns = [
        {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
        },
        {
            title: 'Daily cases',
            key: 'dailyCases',
            dataIndex: 'dailyCases',
        },
        {
            title: 'Daily cases cumulative',
            key: 'dailyCasesCumulative',
            dataIndex: 'dailyCasesCumulative'
        },
        {
            title: 'Daily deaths',
            key:'dailyDeaths',
            dataIndex: 'dailyDeaths',
        }
    ]
    const renderFooter = ()=>(
        <>
            <p>Showing data for <b>{state.userLocation}</b>. Provided by <a href='https://coronavirus.data.gov.uk/'>https://coronavirus.data.gov.uk/</a> 
                <br/>
                You can change the city and the data you want to display in the <a href='/covidtracking'>Covid-19 </a>page
            </p>
        </>
    )
    return(
        <Table 
            dataSource={data} 
            columns={tableColumns} 
            pagination={false}
            size={'small'}
            footer={()=>renderFooter()}
        />
    )
}
export default CovidTable;