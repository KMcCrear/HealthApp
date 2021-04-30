import React from 'react';
import {Table, Button} from 'antd';
import endpoint from '../helpers/endPoint';
import Axios from 'axios';

const CovidTable = (props)=>{
    const {data, setData, state, onUpdate} = props;

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
            title: 'Cases cumulative',
            key: 'casesCumulative',
            dataIndex: 'casesCumulative'
        },
        {
            title: 'Daily deaths',
            key:'dailyDeaths',
            dataIndex: 'dailyDeaths',
        },
        {
            title: 'Deaths cumulative',
            key: 'cumulativeDeaths',
            dataIndex: 'cumulativeDeaths'
        }
    ]
    const resetLocation = ()=>{
        const body = {
			table: 'users',
			field: 'userLocation',
            id: state.id,
        }
        Axios.post(`${endpoint()}/resetField`, body);
        onUpdate({userLocation: null});
        setData(null);
    }
    console.log('user location is ', state.userLocation);
    const renderFooter = ()=>(
        <>
            <p>Showing data for <b>{state.userLocation}</b>. Provided by <a href='https://coronavirus.data.gov.uk/'>https://coronavirus.data.gov.uk/</a> 
                <br/>
                <Button onClick={()=>resetLocation()}>Reset</Button>
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