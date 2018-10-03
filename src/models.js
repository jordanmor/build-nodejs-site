const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Genre name is required'],
        minlength: 3,
        maxLength: 50
    }
});

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Customer name is required']
    },
    phone: String,
    isGold: {
        type: Boolean,
        default: false
    }
});

const Genre = mongoose.model('Genre', GenreSchema);
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports.Genre = Genre;
module.exports.Customer = Customer;