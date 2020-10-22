const path = require('path')
const result = require('dotenv').config({ path: path.join(__dirname, '.env') })

if (result.error) throw result.error // Throw an error if it failed to load the content off the .env file.

const {
    PREFIX: prefix = '$',
    BOT_TOKEN: botToken,
    LOCAL_DB_SCHEME = 'mongodb',
    LOCAL_DB_USER,
    LOCAL_DB_PASSWORD,
    LOCAL_DB_HOST = 'localhost',
    LOCAL_DB_PORT = '',
    LOCAL_DB_AUTH_DB = '',
    LOCAL_DB_OPTIONS = '',
    DB_SCHEME = 'monogdb',
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT = '',
    DB_AUTH_DB,
    DB_OPTIONS = '',
} = process.env

// Build the mongo connection string for the local development environment.
const devMongoUrlComponents = [
    LOCAL_DB_SCHEME,
    '://',
    LOCAL_DB_USER,
    ':',
    LOCAL_DB_PASSWORD,
    '@',
    LOCAL_DB_HOST,
    LOCAL_DB_PORT ? ':' : '',
    LOCAL_DB_PORT,
    '/',
    LOCAL_DB_AUTH_DB,
    LOCAL_DB_OPTIONS ? '?' : '',
    LOCAL_DB_OPTIONS,
]

let devMongoUrl = devMongoUrlComponents.join('')

// Build the mongo connection string for the production environment.
let productionMongoURLComponents = [
    DB_SCHEME,
    '://',
    DB_USER,
    ':',
    DB_PASSWORD,
    '@',
    DB_HOST,
    DB_PORT ? ':' : '',
    DB_PORT,
    '/',
    DB_AUTH_DB,
    DB_OPTIONS ? '?' : '',
    DB_OPTIONS,
]

let productionMongoURL = productionMongoURLComponents.join('')

module.exports = {
    prefix,
    botToken,
    devMongoUrl,
    productionMongoURL,
}
