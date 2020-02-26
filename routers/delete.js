const express = require('express')
const router = express.Router()
const mongoSetup = require('../mongosetup')

// debug
router.get('/', (req, res) => {
    res.send('delete section')
})

router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    mongoSetup.connect(db => {
        db.collection('calendars').deleteOne( {"_id":  mongoSetup.ObjectId(req.params.id)})
    })
    res.send('Document deleted')
}) 


module.exports = router 