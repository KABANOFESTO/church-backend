const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a title'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
    },
    message: {
        type: String,
        required: [true, 'Please add a content']
    }
}, {
    timeStamps: true
})
module.exports = mongoose.model("Message", schema)