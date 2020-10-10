const path = require('path')
const result = require('dotenv').config({ path: path.join(__dirname, '.env') })

if (result.error) throw result.error // Throw an error if it failed to load the content off the .env file.

module.exports = {
    prefix: process.env.PREFIX,
    botToken: process.env.BOT_TOKEN,
    devMongoUrl: `mongodb://${process.env.LOCAL_DB_USER}:${process.env.LOCAL_DB_PASSWORD}@mongo/${process.env.LOCAL_DB_MONGO}`,
    productionMongoURL: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xeg5k.mongodb.net/${process.env.DB_MONGO}?retryWrites=true&w=majority`,
}
