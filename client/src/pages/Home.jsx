//import "antd/dist/antd.css";
import Axios from "axios";
import endpoint from '../helpers/endPoint';
import React, {useEffect, useState} from "react";
import _ from 'lodash';
import {Row, Col, Table, Space, Button, Modal, Input, Form, TimePicker, DatePicker} from 'antd';
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import getLocation from '../helpers/getLocation';
import getCovidData from '../helpers/getCovidData';

const Home=(props)=> {

	const {onUpdate, state} = props;
	const [tableData, setTableData] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [location, setLocation ]= useState(null);
	const emptyRow = {
		info: '',
		time: '',
		date: '',
		location: '',
		userId: state.id,
		timeMoment: null,
		dateMoment: null,
	}

	const [newRow, setNewRow] = useState(emptyRow);

	useEffect (()=>{
		if(!state.id){return;}
		console.log('getting the reminders for the user', state.id);
		Axios.get(`${endpoint()}/home/reminders-get`,{
			params:{
				userId: state.id
			}
		}).then((response)=>{setTableData(response.data)})
	},[state.id])
	
	const updateNewRow = (field) =>{
		const row = _.cloneDeep(newRow)
		_.merge(row, field)
		setNewRow(row)
	}

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
				<Button icon={<DeleteOutlined/>} onClick={()=>deleteRow(text)}/>
			)
		}
	]

	const deleteRow = (row)=>{

		const newTableData = _.cloneDeep(tableData);
		const index = newTableData.indexOf(row);
		newTableData.splice(index, 1);
		console.log('new table data', newTableData)

		Axios.post(`${endpoint()}/home/reminders-delete`,{
			id: row.id,
		}).then((response)=>console.log(response))

		setTableData(newTableData)
	}

	const addRowForm = () =>{
		setModalVisible(true)
	}

	const modalOnCancel = () =>{
		setModalVisible(false)
	}

	const modalOnOk = () =>{
		console.log('modal on ok', newRow)
		Axios.post(`${endpoint()}/home/reminders-add`, newRow
		).then((response)=>console.log(response))
		const newTableData = _.cloneDeep(tableData);
		newTableData.push(newRow)
		setTableData(newTableData);
		setNewRow(emptyRow);
		setModalVisible(false)
	}

	const setNewLocation = ()=>{
		const newLocation = getLocation();
		console.log('location in home is ', newLocation )
		setLocation(newLocation);
	}


	const renderNoLocation = () =>{
		console.log('render new loc')
		return (
			<>
			{!location && (				
				<>
					<h3>No location data available</h3> 
					<Button onClick={()=>setNewLocation()}> Find my location </Button>		
					<br/>
					<h3>Or search it manually</h3>	
					<Input placeholder = {'Type city e.g. Manchester '}/>
				</>
			)}
			{location && (
				<>
					<p>Do you want to set your location to <span color='red'>{location}</span></p>
				</>
			)}
			</>
		)
	}
	return(
		<>
		<Row>
			<Col span={9}>
				<h1>Your reminders</h1>
				<Table 
					dataSource={tableData} 
					columns={tableColumns} 
					scroll={{y:400}}
					bordered={true}
					pagination={false}
					size={'small'}
				/>			
			<Button
				type="dashed"
				onClick={() => {
				addRowForm();
				}}
				style={{ width: '100%'}}
				icon={<PlusOutlined />}
			> Add a row 
			</Button>
			</Col>
			<Col span={0.7}>
				<>
				</>
			</Col>
			<Col span={9}>
				<h1> Covid information near you </h1>
				<div class='rectangle'>
					{!state.userLocation && renderNoLocation()}
				</div>
			</Col>
		</Row>

		<Modal visible={modalVisible} onCancel={()=>{modalOnCancel()}} onOk={()=>{modalOnOk()}}>
				<Form>
					<Form.Item label='Information' rules={[{required: true}]}>
						<Input value={newRow.info}onChange={(e)=>{updateNewRow({info: e.target.value})}} placeholder='set information'/>
					</Form.Item>
					<Form.Item label='Time'>
						<TimePicker value={newRow.timeMoment} onChange={(time, timeString) =>{
							updateNewRow({time: timeString, timeMoment: time})}} format={'HH:mm'}
						/>
					</Form.Item>
					<Form.Item label='Date'>
						<DatePicker value={newRow.dateMoment} onChange={(date, dateString)=>{
							updateNewRow({date: dateString, dateMoment: date})}}
						/>
					</Form.Item>
					<Form.Item label='Location'>
						<Input value={newRow.location} onChange={(e)=>{updateNewRow({location: e.target.value})}} placeholder='setLocation'/>
					</Form.Item>
				</Form>
		</Modal>
		</>
	);

}
export default Home;
 