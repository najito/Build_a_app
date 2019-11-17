const messages = require('../models/MessageModel')

const messageController = {};

//need to make messages
messageController.postMessage = (req, res, next) => {
    //I guess this is time in 24 hour time?
    const today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    messages.create({
        message: req.body.message,
        password: req.body.password,
        created_at: time
    }, (err) => {
        if (err) return next(err);
        return next()
    })
}

messageController.getMessage = (req, res, next) => {
    //find all things then send them back
    messages.find({}, (err, data) => {
        if (err) return next('Error in messageController.getMessage: ' + JSON.stringify(err));
        res.locals.messages = data;
        return next();
    })
}

//find one by id that's stored in the id of the html
messageController.deleteMessage = (req, res, next) => {
    messages.findOneAndDelete({ _id: req.body.id}, (err) => {
        if (err) return next(err);
        return next();
    })
}

module.exports = messageController;

