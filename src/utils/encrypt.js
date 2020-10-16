const crypto = require('crypto')

const algorithm = 'aes-256-cbc' // use the aes256 encryption algorithm
const key = process.env.KEY
const iv = process.env.IV
// key has to be 32 chars long
// iv has to be 16 chars long
/*
if (key.length !== 32 || iv.length !==) {
console.error("Key and IV lengths are invalid")
} */

let encrypt = (text) => {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    // return encrypted;
    // encrypted is a buffer - return an array of numbers instead
    return encrypted.toJSON().data
}

/*
=-= `encrypt` produces an array so it can be stored in MongoDB
=-= `decrypt` consumes an array, converts the array into a buffer, deciphers the
=-= buffer, and then converts the buffer into a string
*/

let decrypt = (arr) => {
    let encryptedText = Buffer.from(arr)
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString('utf8') // convert the buffer to a string
}

module.exports = { encrypt, decrypt }

/*
=-= USAGE:
=-= const functions = require("./path/to/src/utils/encrypt.js")
=-= const encrypt = functions.encrypt
=-= const decrypt = functions.decrypt
=-= encrypt(thing)
=-= decrypt(thing)
*/
