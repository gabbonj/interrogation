const interrogationRouter = require('./interrogation')
const express = require('express')
const router = express.Router()
const addRouter = require('./add')
const deleteRouter = require('./delete')

router.use('/interrogations', interrogationRouter)
router.use('/add', addRouter)
router.use('/delete', deleteRouter)

// debug
router.get('/', (req, res) => {
    res.send('Welcome to the API')
})


module.exports = router