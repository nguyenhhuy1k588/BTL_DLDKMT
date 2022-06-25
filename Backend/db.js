const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database')
const config = require('./config');

const app = initializeApp(config.firebaseConfig);

const db = getDatabase(app, 'https://esp8266-iot-15956-default-rtdb.asia-southeast1.firebasedatabase.app/')

module.exports = db;