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

const Genre = mongoose.model('Genre', GenreSchema);

module.exports.Genre = Genre;