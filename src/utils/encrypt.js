/*const crypto = require('crypto')

const algorithm = 'aes-256-cbc' // use the aes256 encryption algorithm
const key = process.env.KEY
// const key = 'uqB2&:pQ"4-5KVTJ@&-#*"LgQ2KBGQyn'
const iv = process.env.IV
// const iv = 'bz-qG-U*"6tz87;G'
// key has to be 32 chars long
// iv has to be 16 chars long

if (key.length !== 32 || iv.length !==) {
console.error("Key and IV lengths are invalid")
} 

// eslint-disable-next-line no-unused-vars
let encrypt = (schema, options) => {
    schema.pre('save', { document: true, query: false }, function func(next) {
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
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
                Buffer.from(key),
                iv
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
