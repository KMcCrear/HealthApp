// import {Modal, Input, Form, TimePicker, DatePicker} from 'antd';

// const RemindersModal = (props) =>{
//     const {updateNewRow, modalOnOk, modalOnCancel} = props;
//     return(		
//     <>
//         <Modal visible={modalVisible} onCancel={()=>{modalOnCancel()}} onOk={()=>{modalOnOk()}}>
// 				<Form>
// 					<Form.Item label='Information' rules={[{required: true}]}>
// 						<Input value={newRow.info}onChange={(e)=>{updateNewRow({info: e.target.value})}} placeholder='set information'/>
// 					</Form.Item>
// 					<Form.Item label='Time'>
// 						<TimePicker value={newRow.timeMoment} onChange={(time, timeString) =>{
// 							updateNewRow({time: timeString, timeMoment: time})}} format={'HH:mm'}
// 						/>
// 					</Form.Item>
// 					<Form.Item label='Date'>
// 						<DatePicker value={newRow.dateMoment} onChange={(date, dateString)=>{
// 							updateNewRow({date: dateString, dateMoment: date})}}
// 						/>
// 					</Form.Item>
// 					<Form.Item label='Location'>
// 						<Input value={newRow.location} onChange={(e)=>{updateNewRow({location: e.target.value})}} placeholder='setLocation'/>
// 					</Form.Item>
// 				</Form>
// 		</Modal>
//     </>    
//     );

// }
// export default RemindersModal