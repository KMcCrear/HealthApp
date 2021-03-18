import "antd/dist/antd.css";
import Axios from "axios";
import endpoint from '../helpers/endPoint';
import React, {useEffect, useState} from "react";
import {Row, Col, Table, Space, Button} from 'antd';
import { EditFilled } from "@ant-design/icons";

const Home=(props)=> {

	const {onUpdate, state} = props;
	const [tableData, setTableData] = useState();
	useEffect (()=>{
		console.log('getting the reminders for the user', state.id);
		Axios.get(`${endpoint()}/home/reminders-get`,{
			params:{
				id: state.id
			}
		}).then((response)=>{setTableData(response.data)})
	},[])
	console.log('table data is ', tableData)
	const tableColumns = [
		{
			title: 'Information',
			dataIndex: 'info',
			key: 'info',
		},
		{
			title: 'Time',
			dataIndex: 'time',
			key:'time',
		},
		{
			title:'Date',
			dataIndex: 'date',
			key:'date',
		},
		{
			title: 'Location',
			dataIndex:'location',
			key: 'location',
		},
		{
			title:'Action',
			key:'action',
			render: (text)=>(
				<Space>
				<Button onClick={()=>editRow(text)}>Edit</Button>
				<Button onClick={()=>deleteRow(text)}>Delete</Button>
				</Space>
			)
		}
	]

	// const tableData = [
	// 	{
	// 		key: '0',
	// 		info: 'Go to the doctors appointment',
	// 		time: '11pm',
	// 	},
	// 	{
	// 		key: '1',
	// 		info: 'Testing this table',
	// 		time: '5am',
	// 	},
	// 	{
	// 		key: '2',
	// 		info: 'Testing this table',
	// 		time: '5am',
	// 	},
	// 	{
	// 		key: '3',
	// 		info: 'Testing this table',
	// 		time: '5am',
	// 	},
	// 	{
	// 		key: '4',
	// 		info: 'Testing this table',
	// 		time: '5am',
	// 	},
	// 	{
	// 		key: '5',
	// 		info: 'Testing this table',
	// 		time: '5am',
	// 	},
	// 	{
	// 		key: '6',
	// 		info: 'Testing this table',
	// 		time: '5am',
	// 	}

	// ]
	
	const deleteRow = (key)=>{
		// this is working it just doesn't rerender the component atm
		// mysql functionalities need to be added too
		const index = tableData.indexOf(key);
		if (index > -1) {
			tableData.splice(index, 1);
		  }
		console.log('table data is ', tableData);

	}
	const editRow = (text, record) =>{
		console.log('text and record are ', text, record);
	}

	return(
		// <div className="Container">
		// 	<div className="landingContainer">
		// 		<div className="leftsideHeading">
		// 			<h3>{state.message}</h3>
		// 		</div>
		// 		<div className="excerciseActivities">
		// 			<div className="activity">
		// 				<div>
		// 					<button>Activity 1</button>
		// 				</div>
		// 				<div>
		// 					<button>Activity 2</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<Row>
			<Col span={9}>
				<Table 
					dataSource={tableData} 
					columns={tableColumns} 
					scroll={{y:400}}
					pagination={false}
					size={'small'}
				/>
				</Col>
		</Row>
	);
	
}
export default Home;
 