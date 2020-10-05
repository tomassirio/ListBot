require("dotenv").config()

const mongoose = require('mongoose')

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        }

        // if (process.env.NODE_ENV === 'development') {
            // mongoose.connect('mongodb://db:27017/' + process.env.DB_MONGO + '?retryWrites=true&w=majority', dbOptions)
            mongoose.connect(process.env.MONGO_URI, dbOptions)
            // console.log(process.env.MONGO_URI)
        // } else {
            // mongoose.connect('mongodb+srv://'+ process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@cluster0.mhoa7.mongodb.net/' + process.env.DB_MONGO + '?retryWrites=true&w=majority', dbOptions)
        // }
        mongoose.set('useFindAndModify', false)
        mongoose.Promise = global.Promise

        mongoose.connection.on('connected', () => {
            console.log('Mongoose has suceesfully connected')
        })

        mongoose.connection.on('err', () => {
            console.error(`Mongoose connection error: \n${err.stack}`)
        })

        mongoose.connection.on('disconected', () => {
            console.warn('Mongoose has disconnected')
        })
    }
}
