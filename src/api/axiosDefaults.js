import axios from "axios";

axios.defaults.baseURL = 'https://lghbokning.herokuapp.com'
axios.defaults.headers.post['Content-Type'] = 'multipart/forms-data'
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
