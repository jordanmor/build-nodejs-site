const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Genre name is required'],
    minlength: 5,
    maxLength: 50
  }
});

const Genre = mongoose.model('Genre', GenreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).required()
  };

  return Joi.validate(genre, schema);
}

module.exports.GenreSchema = GenreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;