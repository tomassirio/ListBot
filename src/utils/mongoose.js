const { devMongoUrl , productionMongoURL } = require('../config')
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

mongoose.connection.on('connected', () => {
    console.log('Mongoose has suceesfully connected.')
})

mongoose.connection.on('err', () => {
    console.error(`Mongoose connection error: \n${err.stack}.`)
})

mongoose.connection.on('disconected', () => {
    console.warn('Mongoose has disconnected.')
})

module.exports = {
    init: async () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        }

        if(process.env.NODE_ENV === "development"){
            await mongoose.connect(devMongoUrl, dbOptions)
        } else {
            await mongoose.connect(productionMongoURL, dbOptions)
        }

        return mongoose.connection;
    }
}
