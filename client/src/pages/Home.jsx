import "antd/dist/antd.css";

import React from "react";
import {Row, Col, Table, Space} from 'antd';
import { EditFilled } from "@ant-design/icons";
const Home=(props)=> {

	const {onUpdate, state} = props;


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
			title:'Action',
			key:'action',
			render: (text)=>(
				<Space>
				<button onClick={()=>editRow(text)}>Edit</button>
				<button onClick={()=>deleteRow(text)}>Delete</button>
				</Space>
			)
		}
	]

	const tableData = [
		{
			key: '0',
			info: 'Go to the doctors appointment',
			time: '11pm',
		},
		{
			key: '1',
			info: 'Testing this table',
			time: '5am',
		}
	]
	const deleteRow = (key)=>{
		// this is working it just doesn't rerender the component atm
		// we need to add it as a table in mysql 
		console.log('key is', key);
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
			<Col span={10}>
				<Table dataSource={tableData} columns={tableColumns} pagination={false}/>
				</Col>

		</Row>
	);
	
}
export default Home;
 