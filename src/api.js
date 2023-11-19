import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT
})

export default api;