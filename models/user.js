const {Schema, model} = require('mongoose');
const UserData = new Schema({
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

module.exports = UserData;