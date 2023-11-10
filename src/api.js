import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.0.136:8001/api'
})

export default api;