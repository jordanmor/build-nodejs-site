const genres = require('./routes/genres');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', err => console.error('connection error:', err));
db.once('open', () => console.log('db connection successful'));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));