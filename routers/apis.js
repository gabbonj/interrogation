const interrogation = require('./interrogation')
const express = require('express')
const router = express.Router()

router.use('/interrogations', interrogation)

// debug
router.get('/', (req, res) => {
    res.send('Welcome to the API')
})

module.exports = router