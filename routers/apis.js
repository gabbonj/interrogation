const express = require('express')
const router = express.Router()

const MongoClient  = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';
const dbName = 'admin';

router.get('/', (req, res) => {
    res.send('Welcome to the API')
})

router.get('/users', (req, res) => {
    MongoClient.connect(url).then((client) => {
        var db = client.db('admin')
        db.collection('organizzation').find().toArray(function(err, result) {
            if (err) throw err;
            console.log(result)
            res.json(result)
        })
    })
})


module.exports = router