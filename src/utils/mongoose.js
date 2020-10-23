const mongoose = require('mongoose')
const { devMongoUrl, productionMongoURL } = require('../config')

mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

mongoose.connection.on('connected', () => {
    console.log('Mongoose has successfully connected.')
})

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: \n${err.stack}.`)
})

mongoose.connection.on('disconnected', () => {
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
            family: 4,
        }

        if (process.env.NODE_ENV === 'development') {
            await mongoose.connect(devMongoUrl, dbOptions)
        } else {
            await mongoose.connect(productionMongoURL, dbOptions)
        }

        return mongoose.connection
    },
}
