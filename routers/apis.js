const interrogationRouter = require('./interrogation')
const express = require('express')
const router = express.Router()
const addRouter = require('./add')

router.use('/interrogations', interrogationRouter)
router.use('/add', addRouter)

// debug
router.get('/', (req, res) => {
    res.send('Welcome to the API')
})


module.exports = router