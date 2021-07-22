const {Schema, model} = require('mongoose');
const UserData = new Schema({
    user: {
        type: String, 
        required: true,   
    },
    password: {
        type: String, 
        default: "",   
    }
});

module.exports = UserData;