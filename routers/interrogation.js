const express = require('express')
const router = express.Router()
const mongoSetup = require('../mongosetup')


// get all the calendars
router.get('/', (req, res) => {
    mongoSetup.connect(db => {
        db.collection('calendars').find().toArray((err, result) => {
            if (err) throw err
            res.json(result)
        })
    })
})

router.get('/subject', (req, res) => {
    res.redirect('/api/interrogations')
})

// get calendars by subject
router.get('/subject/:name', (req, res) => {
    const subject_name = req.params.name
    mongoSetup.connect(db => {
        db.collection('calendars').find({'subject' : subject_name}).toArray((err, result) => {
            if (err) throw err
            res.json(result)
        })
    })
})

// get calendar days
router.get('/days', (req, res) => {
    var out = []
    mongoSetup.connect(db => {
        db.collection('calendars').find().toArray((err, result) => {
            if (err) throw err
            result.forEach(calendar => {
                out.push({id : calendar._id, 'subject' : calendar.subject, 'days' : []})
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
    mongoSetup.connect(db => {
        db.collection('calendars').find({'subject' : subject_name}).toArray((err, result) => {
            if (err) throw err
            result.forEach(calendar => {
                out.push({id : calendar._id, 'subject' : calendar.subject, 'days' : []})
                calendar.days.forEach(day => {
                    out[out.length - 1].days.push(day.date)
                });
            });
            res.json(out)
        })
    })
})


module.exports = router