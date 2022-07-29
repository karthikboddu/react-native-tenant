//import axios from 'axios';
//const API_URL =  'http://192.168.0.126:8000';
const API_URL = 'https://nodejs-authtest.herokuapp.com';
/*
export async function addTasks(data) {

    return await axios.post(`${API_URL}/api/addExpensesItem`,data, {
        headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )
}
*/

export async function getTasksList(){

    return await axios.get(`${API_URL}/api/tutorials`)

}
