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
  phone: {
    type: String,
    validate: {
      validator: function(num) {
        return /\d{3}-\d{3}-\d{4}/.test(num);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  isGold: {
    type: Boolean,
    default: false
  }
});

const Genre = mongoose.model('Genre', GenreSchema);
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports.Genre = Genre;
module.exports.Customer = Customer;