//import "antd/dist/antd.css";
import Axios from "axios";
import endpoint from '../helpers/endPoint';
import React, {useEffect, useState} from "react";
import _ from 'lodash';
import {Row, Col, Table, Space, Spin, Button, Modal, Input, Form, TimePicker, DatePicker} from 'antd';
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import getLocation from '../helpers/getLocation';
import {getCovidData, getCovidAreas} from '../helpers/getCovidData';
import changeTableField from '../databaseAccess/changeTableField';
import CovidTable from '../components/CovidTable';

const Home=(props)=> {

	const {onUpdate, state} = props;
	const [tableData, setTableData] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

	const [location, setLocation ]= useState(null);
	const [locationError, setLocationError] = useState(null)
	const [manualLocation, setManualLocation] = useState(null);
	const [locationLoading, setLocationLoading] = useState(false);

	const [covidData, setCovidData] = useState(null);
	const [availableAreas, setAvailableAreas] = useState(null)
	const [allAreas, setAllAreas] = useState(null);
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
	useEffect(()=>{
		const getAreas = async()=>{
			await getCovidAreas(setAllAreas)
		}
		getAreas()
	},[])
	useEffect (()=>{
		if(!state.id){return;}
		console.log('getting the reminders for the user', state.id);
		Axios.get(`${endpoint()}/home/reminders-get`,{
			params:{
				userId: state.id
			}
		}).then((response)=>{setTableData(response.data)})
	},[state.id])

	useEffect(()=>{
		if(!state.userLocation){return}
		fetchCovidData(state.userLocation)
	},[state.userLocation])

	useEffect(()=>{
		setLocationLoading(false)
		if(!location){return}
		// checking if location is in api

		const newAvailableAreas = [];
		console.log('all areas ', allAreas)
		allAreas.forEach((area)=>{
			if(area.toLowerCase().includes(location.toLowerCase())){
				newAvailableAreas.push(area)
			}
		})
		setAvailableAreas(newAvailableAreas)
		if (!newAvailableAreas.length){
			setCovidData(404)
		} else{
			if(location!==newAvailableAreas[0]){
				setLocation(newAvailableAreas[0])
			} else {
				fetchCovidData(location)
			}
		}

	},[location])

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
		const newTableData = _.cloneDeep(tableData);
		newTableData.push(newRow)
		Axios.post(`${endpoint()}/home/reminders-add`, newRow
		).then((response)=>console.log(response))
		setTableData(newTableData);
		setNewRow(emptyRow);
		setModalVisible(false)
	
	}
	const fetchCovidData = async(searchLocation)=>{
		await getCovidData(searchLocation, setCovidData)
	}

	console.log('COVID DATA ', covidData)
	const setUserLocation = () =>{
		const body = {
			table: 'users',
			field: 'userLocation',
			value:	location,
			userId: state.id,
		}
		changeTableField(body)
		resetLocation()
		onUpdate({userLocation: location});
	};

	const manualSearch = ()=>{	
		return(
			<>
				<Input 
					placeholder = {'Type city name e.g. Liverpool '}
					onChange={(e)=>setManualLocation(e.target.value)}
				/>
				<Button onClick={()=>{
					setLocationError(false)
					setLocation(manualLocation)
				}}disabled={!manualLocation}>Confirm</Button>
			</>
		)
	}

	const resetLocation = ()=> {
		setLocation(null); 
		setCovidData(null);
		setManualLocation(null);
	}

	const renderNoLocation = () =>{
		return (
			<>
			{(!location && !covidData && !locationError) && (				
				<>
					<h3>No location data available</h3> 
					{!locationLoading && (					
					<Button 
						onClick={()=>{getLocation(setLocation, setLocationError); setLocationLoading(true)}}> 
						Find my location 
					</Button>
					)}
					{locationLoading && (<Spin tip='Loading...'/>)}
					<br/>
					<h3>Or search it manually:</h3>	
					{manualSearch()}
				</>
			)}

			{(location || covidData ) && (
				<>
					<p>We either determined your location or you chose <span style={{color: 'red'}}>{location}</span>.</p>
					{covidData!==404 && covidData && (
						<>
							<br/><br/>
							<h3>There is data available for the selected area</h3> 
							<Space>
								<Button onClick={()=>setUserLocation()}>Set as default area</Button>
								<Button danger onClick={()=>resetLocation()}>Cancel</Button>
							</Space>
						</>
					)}
					{!covidData && (
						<Spin tip='Loading Covid data'/>
					)}
					{(covidData===404 || locationError) && (
						<b>Sorry, we couldn't find data for the selected area <br/>
							Try searching manually
							{manualSearch()}
						</b>
					)}
				</>
			)}

			{locationError &&(
				<p>	We encountered an error while getting your location: <br/>
					<span style={{color:'red'}}>{locationError}</span> <br/><br/><br/><br/>
					You can set your city manually:
					{manualSearch()}
				</p>
					
			)}
			</>
		)
	}
	return(
		<>
		<div class="reminders">
		<Row>
			<Col span={9}>
				<h1>Your reminders</h1>
				<Table 
					dataSource={tableData} 
					columns={tableColumns} 
					scroll={{y:150}}
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
			</Row>
			</div>
			<div class="covid-table">
			<Row>
			<Col span={0.7}>
				<>
				</>
			</Col>
			<Col span={9}>
				<h1> Covid-19 information near you </h1>
				<div class='rectangle'>
					{!state.userLocation && renderNoLocation()}
					{state.userLocation && 
						<CovidTable 
							data={covidData}
							state={state}
						/>}
				</div>
			</Col>
		</Row>
		</div>

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
 