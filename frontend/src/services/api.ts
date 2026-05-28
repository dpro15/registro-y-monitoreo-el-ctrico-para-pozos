import axios from 'axios'

const api = axios.create({
  baseURL: 'https://registro-y-monitoreo-el-ctrico-para-pozos.onrender.com',
})

export default api