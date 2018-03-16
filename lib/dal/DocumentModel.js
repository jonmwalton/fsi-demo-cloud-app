var collection = 'Document',
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
