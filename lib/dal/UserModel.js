var collection = 'User',
  logger = require('../logger'),
  dal = require('./dal.js');

var noop = function () {};

exports.create = function (fields, cb) {
  cb = cb || noop;
  dal.create(collection, fields, cb);
};

exports.getAll = function (cb) {
  cb = cb || noop;
  var restrictions = {};

  dal.list(collection, restrictions, cb);
};

exports.login = function (username, password, cb) {
  var restrictions = {
    'eq': {
      'username': username,
      'password': password
    }
  };
  dal.list(collection, restrictions, function (err, result) {
    if (err) {
      cb(err);
    } else {
      if (result.list.length === 0) {
        cb(new Error('Invalid username or password'));
      } else {
        logger.debug('User has logged in')
        cb();
      }
    }
  });
}

dal.removeAll(collection, function () {
  exports.create({
    'userId': '1231',
    'username': 'user1',
    'password': 'pass'
  }, noop);
  exports.create({
    'userId': '3212',
    'username': 'user2',
    'password': 'pass'
  }, noop);
  exports.create({
    'userId': '3213',
    'username': 'user3',
    'password': 'pass'
  }, noop);
  exports.create({
    'userId': '3214',
    'username': 'user4',
    'password': 'pass'
  }, noop);
  exports.create({
    'userId': '3215',
    'username': 'user5',
    'password': 'pass'
  }, noop);
})
