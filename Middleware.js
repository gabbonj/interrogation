
module.exports ={
    logger : (req, res, next) => {
        console.log(`Request from ${req.ip}, URL: ${req.url}`)
        next()
    }
}