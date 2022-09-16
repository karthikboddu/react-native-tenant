//import axios from 'axios';
//const API_URL =  'http://192.168.0.126:8000';
const API_URL = 'https://nodejs-authtest.herokuapp.com';


export async function getTasksList(){
    return await fetch(`${API_URL}/api/tutorials`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
}