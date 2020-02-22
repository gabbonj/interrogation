const express = require('express')
const router = express.Router()

const MongoClient  = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'interrogation'

// debug
router.get('/', (req, res) => {
    res.send('Welcome to the API')
})

// get all the calendars
router.get('/interrogations', (req, res) => {
    MongoClient.connect(url).then((client) => {
        var db = client.db(dbName)
        db.collection('calendars').find().toArray((err, result) => {
            if (err) throw err
            res.json(result)
        })
    })
})

// get calendars by subject
router.get('/interrogations/subject/:name', (req, res) => {
    const subject_name = req.params.name
    MongoClient.connect(url).then((client) =>{
        var db = client.db(dbName)
        db.collection('calendars').find({'subject' : subject_name}).toArray((err, result) => {
            if (err) throw err
            res.json(result)
        })
    })
})


module.exports = router