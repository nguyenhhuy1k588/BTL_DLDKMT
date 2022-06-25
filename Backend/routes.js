const express = require("express")
const {
    getAll,
    setLed
} = require("./controller")

const router = express.Router()

router.get('/all', getAll)
router.post('/led', setLed)

module.exports = {
    routes: router
}