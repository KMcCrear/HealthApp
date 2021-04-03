import Axios from 'axios';
import endpoint from '../helpers/endPoint';

const changeTableField = (body) =>{
    Axios.post(`${endpoint()}/editTable`, body
    ).then((response)=> {console.log(response)})
}
export default changeTableField;