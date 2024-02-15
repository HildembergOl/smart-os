import axios from 'axios'
// import Cookies from 'js-cookie'
// const token = Cookies.get('tokenUserWMS')
// api.defaults.headers['Authorization'] = token || null

const api = axios.create()

api.defaults.baseURL = '/api/'
api.defaults.headers['Access-Control-Allow-Origin'] = '*'
api.defaults.timeout = 10000

export default api
