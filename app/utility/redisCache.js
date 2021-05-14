const redis = require('redis');

const client = redis.createClient();

function setRedis(KEY, data) {
  client.setex(KEY, 7200, JSON.stringify(data));
}
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
