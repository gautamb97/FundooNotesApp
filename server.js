/* eslint-disable linebreak-style */
const express = require('express');
const logger = require('./app/logger/user');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FundooNotesApp.' });
});

app.listen(3000, () => {
  logger.log('info', 'Server is listening on port 3000');
});
