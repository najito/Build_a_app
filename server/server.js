const express = require('express');
const app = express();
const path = require('path');
const messageController = require('./controllers/messageController')
const authController = require('./controllers/authController')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const PORT = 3434;
//serve static files
app.use(express.static('assets'))
//serve html file upon page load
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})
//parser for cookies and url if needed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

//getting the list of messages
app.get('/messages', messageController.getMessage, (req, res) => {
    res.status(200).json({messages: res.locals.messages})
})

//posting a message and adding to database with cookies being set
app.post('/messages', messageController.postMessage, authController.setCookie, (req, res) => {
    res.sendStatus(200)
})

//need to verify cookies before deleting the message in order to preven deletion if not valid
app.delete('/messages', authController.verifyCookie, messageController.deleteMessage, (req, res) => {
    res.sendStatus(200)
})

/**
 * 404 handler
 */
app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });
  
  /**
   * Global error handler
   */
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})