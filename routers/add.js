const express = require('express')
const router = express.Router()
const mongoSetup = require('../mongosetup')

// debug
router.get('/', (req, res) => {
    res.send('add section')
})

// add a calendar to the database
router.post('/calendar', (req, res) => {
    try{
        if (req.body && req.body.subject && req.body.days){
            mongoSetup.connect(db => {
                db.collection('calendars').insertOne(req.body)
                db.close()
            })
            res.send('Calendar added')
        }else{
            res.status(400)
            res.send('This is not a calendar object')
        }
    }catch{
        res.status(404)
        res.send('Error')
    }

})

// add an array of calendars to the database
router.post('/calendars', (req, res) => {
    try{
        mongoSetup.connect(db => {
            req.body.forEach(calendar => {
                if (calendar && calendar.subject && calendar.days) {
                    db.collection('calendars').insertOne(calendar)
                }else{
                    res.status(400)
                    res.send('Bad request')
                }
            });
        })
        res.send('Calendars added')
    }catch{
        res.status(404)
        res.send('Error')
    }
})



module.exports = router