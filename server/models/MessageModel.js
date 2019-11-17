const mongoose = require('mongoose')

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://Innovator:Theredshield013@cluster0-b1arx.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Messages'
})
.then(()=> console.log('connected to Mongo'))
.catch((err)=> console.log(err))

const Schema = mongoose.Schema;

const messageSchema = new Schema ({
    message: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: String,
})

const Message = mongoose.model('messages', messageSchema)

module.exports = Message; // <-- export your model
