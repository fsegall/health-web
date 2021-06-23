import axios from 'axios';



const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use((response) => {

  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error.response);
});

export default api;
