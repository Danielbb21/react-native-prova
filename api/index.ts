import axios from "axios";

export const api = axios.create({
    baseURL: 'http://172.23.128.1:3333',
    timeout: 1000
});