const express = require('express')
const router = express.Router()

const MongoClient  = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'interrogation'

function connect(url, name, task) {
    MongoClient.connect(url).then((client) => {
        var db = client.db(name)
        task(db)
    })
}

// get all the calendars
router.get('/', (req, res) => {
    connect(url, dbName, db => {
        db.collection('calendars').find().toArray((err, result) => {
            if (err) throw err
            res.json(result)
        })
    })
})

// get calendars by subject
router.get('/subject/:name', (req, res) => {
    const subject_name = req.params.name
    connect(url, dbName, db => {
        db.collection('calendars').find({'subject' : subject_name}).toArray((err, result) => {
            if (err) throw err
            res.json(result)
        })
    })
})

// get calendar days
router.get('/days', (req, res) => {
    var out = []
    connect(url, dbName, db => {
        db.collection('calendars').find().toArray((err, result) => {
            if (err) throw err
            result.forEach(calendar => {
                out.push({'subject' : calendar.subject, 'days' : []})
                calendar.days.forEach(day => {
                    out[out.length - 1].days.push(day.date)
                });
            });
            res.json(out)
        })
    })
})

// get calendar name by subject
router.get('/subject/:name/days', (req, res) => {
    var out = []
    const subject_name = req.params.name
    connect(url, dbName, db => {
        db.collection('calendars').find({'subject' : subject_name}).toArray((err, result) => {
            if (err) throw err
            result.forEach(calendar => {
                out.push({'subject' : calendar.subject, 'days' : []})
                calendar.days.forEach(day => {
                    out[out.length - 1].days.push(day.date)
                });
            });
            res.json(out)
        })
    })
})

module.exports = router