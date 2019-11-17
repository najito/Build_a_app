const authController = {};
const messages = require('../models/MessageModel')

//set the cookie and move on
authController.setCookie = (req, res, next) => {
    res.cookie('pass', req.body.password)
    return next();
}

//need to do a second query in the chain...
authController.verifyCookie = (req, res, next) => {
    messages.findOne({ _id: req.body.id}, (err, data) => {
        //check if cookie password is the same as password from query
        if (data.password === req.cookies.pass) {
            return next()
        } else {
            //I'm a teapot
            res.status(418).send('invalid password')
        }
    })
}

module.exports = authController;