import "antd/dist/antd.css";
import Axios from "axios";
import endpoint from '../helpers/endPoint';
import React, {useEffect, useState} from "react";
import _ from 'lodash';
import {Row, Col, Table, Space, Button, Modal, Input, Form, TimePicker, DatePicker} from 'antd';
import { EditFilled, PlusOutlined } from "@ant-design/icons";

const Home=(props)=> {

	const {onUpdate, state} = props;
	const [tableData, setTableData] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const emptyRow = {
		info: '',
		time: '',
		date: '',
		location: '',
		userId: null,
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

	if(!newRow.userId && state.id){
		updateNewRow({userId: state.id});
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
				<Space>
				<Button onClick={()=>deleteRow(text)}>Delete</Button>
				</Space>
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

	return(
		<>
		<Row>
			<Col span={9}>
				<h1>Your reminders</h1>
				<Table 
					dataSource={tableData} 
					columns={tableColumns} 
					scroll={{y:400}}
					pagination={false}
					size={'small'}
				/>			
			</Col>
		</Row>
		<Col span={9}>
			<Button
				type="dashed"
				onClick={() => {
				addRowForm();
				}}
				style={{ width: '100%'}}
				icon={<PlusOutlined />}
			> Add a row </Button>
		</Col>

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
 