import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://anomalos-215ca.firebaseio.com/',
});

export default instance;