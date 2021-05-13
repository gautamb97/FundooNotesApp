/**
 * @description   : It is use to establish the connection between the database and server
 * @package       : express, swagger-ui-express, dotenv
 * @file          : server.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./app/swagger.json');
const logger = require('./app/logger/user');
require('dotenv').config();
require('./config/redisConfig');
const MongoDBAdapter = require('./config/dbConfig');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FundooNotesApp.' });
});

require('./app/routes/user')(app);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const db = new MongoDBAdapter(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
db.connect()
  .then((uri) => {
    console.log('Connected to ', uri);
  })
  .catch((uri) => {
    console.log('Disconnected from ', uri);
    db.disconnect();
  });

app.listen(process.env.PORT, () => {
  logger.log('info', 'Server is listening on port 3000');
});

module.exports = app;
