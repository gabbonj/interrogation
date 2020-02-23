const express = require('express')
const router = express.Router()
const mongoSetup = require('../mongosetup')

// debug
router.get('/', (req, res) => {
    res.send('delete section')
})

router.delete('/:id', (req, res) => {
    mongoSetup.connect(db => {
        db.collection('calendars').remove( {'_id' : req.params.id} )
    })
    res.send('Document deleted')
}) 


module.exports = router