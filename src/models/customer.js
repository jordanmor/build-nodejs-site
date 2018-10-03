const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Customer = mongoose.model('Customer', CustomerSchema);

function validateCustomer(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(genre, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;