import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL
})

instance.interceptors.request.use((config) => {
	return config
})

export default instance
