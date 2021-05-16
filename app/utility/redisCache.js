/**
 * @description   : It is work as a middleware between models and controller
 * @file          : redisCache.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const redis = require('redis');

const client = redis.createClient();

/**
 *@description      : it is used set the redis db for caching
 *@param {*} KEY
 *@param  {*} data
*/
function setRedis(KEY, data) {
  client.setex(KEY, 7200, JSON.stringify(data));
}

/**
 *@description      : it is used get data from the redis db for caching
 *@param {*} req
 *@param  {*} res
 *@param {*} next
*/
function redisCache(req, res, next) {
  client.get('notes', (err, notes) => {
    if (err) throw err;

    if (notes !== null) {
      console.log('coming for fetching notes');
      res.send({
        succes: true,
        message: 'fetching from redis',
        data: JSON.parse(notes),
      });
    } else {
      next();
    }
  });
}

module.exports = {
  redisCache, setRedis,
};
