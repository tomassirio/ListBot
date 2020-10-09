const crypto = require("crypto");
const algorithm = "aes-256-cbc"; //use the aes256 encryption algorithm
const key = process.env.KEY;
const iv = process.env.IV;
//key has to be 32 chars long
//iv has to be 16 chars long
/*
if (key.length !== 32 || iv.length !==) {
console.error("Key and IV lengths are invalid")
} */

encrypt = (text) => {
  var cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  var encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  //return encrypted;
  //encrypted is a buffer - return an array of numbers instead
  return encrypted.toJSON().data
};

/*
=-= `encrypt` produces an array so it can be stored in MongoDB
=-= `decrypt` consumes an array, converts the array into a buffer, deciphers the
=-= buffer, and then converts the buffer into a string
*/

decrypt = (arr) => {
  var encryptedText = Buffer.from(arr);
  var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  var decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf8"); //convert the buffer to a string
}

module.exports = {encrypt, decrypt}

/*
=-= USAGE:
=-= const functions = require("./path/to/src/utils/encrypt.js")
=-= const encrypt = functions.encrypt
=-= const decrypt = functions.decrypt
=-= encrypt(thing)
=-= decrypt(thing)
*/
