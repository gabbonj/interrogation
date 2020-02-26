const MongoClient  = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'interrogation'


module.exports = {
    connect : (task) => {
        MongoClient.connect(url).then((client) => {
            var db = client.db(dbName)
            task(db)
        })
    },
    ObjectId : require('mongodb').ObjectId
}