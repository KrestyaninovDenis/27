const {Schema, model} = require('mongoose');
const todoSchema1 = new Schema({
    user: {
        type: String, 
        required: true,   
    },
    password: {
        type: String, 
        default: "",   
    },
    date: {
        type: Date, 
        default: Date.now,   
    }
});

module.exports = todoSchema1;