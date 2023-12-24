import axios from 'axios';

const token = '';
const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
