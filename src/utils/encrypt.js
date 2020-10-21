/*
const crypto = require('crypto')
const config = require('../config')

const algorithm = 'aes-256-cbc' // use the aes256 encryption algorithm

// config.encryptionKey has to be 32 chars long
// config.encryptionIV has to be 16 chars long
/*
if (config.encryptionKey.length !== 32 || config.encryptionIV.length !==) {
console.error("Key and IV lengths are invalid")
} 

// eslint-disable-next-line no-unused-vars
let encrypt = (schema, options) => {
    schema.pre('save', { document: true, query: false }, function func(next) {
        let cipher = crypto.createCipheriv(
            algorithm,
            Buffer.from(config.encryptionKey),
            config.encryptionIV
        )
        let encrypted = cipher.update(this.items[this.items.length - 1].content)
        encrypted = Buffer.concat([encrypted, cipher.final()]).toString(
            'base64'
        )
        this.items[this.items.length - 1].content = encrypted
        next()
    })
}

// eslint-disable-next-line no-unused-vars
let decrypt = (schema, options) => {
    schema.post('findOne', { document: true, query: false }, function func(
        result
    ) {
        for (let i = 0; i <= result.items.length - 1; i++) {
            let encryptedText = result.items[i].content
            let decipher = crypto.createDecipheriv(
                algorithm,
                Buffer.from(config.encryptionKey),
                config.encryptionIV
            )
            let decrypted = decipher.update(encryptedText, 'base64')
            decrypted = Buffer.concat([decrypted, decipher.final()])
            // eslint-disable-next-line no-param-reassign
            result.items[i].content = decrypted.toString()
        }
    })
}

module.exports = { encrypt, decrypt }
*/
/*
=-= USAGE:
=-= const functions = require("./path/to/src/utils/encrypt.js")
=-= const encrypt = functions.encrypt
=-= const decrypt = functions.decrypt
=-= encrypt(thing)
=-= decrypt(thing)
*/
