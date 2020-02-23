
module.exports ={
    // loggs the ip and the url of the request
    logger : (req, res, next) => {
        console.log(`Request from ${req.ip}, URL: ${req.url}`)
        next()
    },
    logBody : (req, res, next) => {
        if (req.body) {console.log( `Request body : ${JSON.stringify(req.body)}`)}
        next()
    }
}