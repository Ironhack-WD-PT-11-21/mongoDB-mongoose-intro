const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    userName: {
        type: String,
        isRequired: true
    },

    email: {
        type: String,
        isRequired: true
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;