// src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // ปรับตามที่ backend ของคุณรันอยู่
});

export default instance;
