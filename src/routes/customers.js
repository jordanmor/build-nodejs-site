const Joi = require('joi');
const express = require('express');
const { Customer } = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  const customers = Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ 
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  }, { new: true });

  if(!customer) res.status(404).send('The customer with the given ID was not found');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findOneAndDelete({ _id: req.params.id });
  if(!customer) res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
});

function validateCustomer(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(genre, schema);
}
  
module.exports = router;