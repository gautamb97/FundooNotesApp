/* eslint-disable linebreak-style */
const express = require('express');
const logger = require('./app/logger/user');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

require('./config/dbConfig');

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FundooNotesApp.' });
});

require('./app/routes/user')(app);

app.listen(process.env.PORT, () => {
  logger.log('info', 'Server is listening on port 3000');
});
