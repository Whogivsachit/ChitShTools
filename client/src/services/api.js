import axios from 'axios';
import { apiUrl } from '../main';

export default () => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            'Content-Type': 'application/json',   
            'Authorization': "Bearer " + localStorage.getItem('token') || null,
        },
    });
}