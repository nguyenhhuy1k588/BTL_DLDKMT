import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://esp8266-smartapp.herokuapp.com/api/'
})

export default instance