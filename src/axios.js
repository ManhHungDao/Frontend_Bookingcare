import axios from 'axios';
import _ from 'lodash';
import config from './config';

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL,
});


instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        return response.data
    }

   
);

export default instance;
