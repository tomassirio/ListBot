const {Schema, model} = require("mongoose");

const itemSchema = Schema({
    content: { 
        default: '',
        type: String
        },           
    author: { 
        default: '',
        type: String
        },   
});

module.exports = model("Item", itemSchema, 'listTest')