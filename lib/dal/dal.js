var $fh = require('fh-mbaas-api');
var _ = require('lodash');
var logger = require('../logger');
var async = require('async');

function noop() {}

// Generic wrapper for all database callbacks
// Ensures logging occurs and a client friendly error is propogated up
function dbCb(cb) {
  return function (err, res) {
    if (err) {
      // logger.error(ERRORS.DB_ERROR.DEV_MSG, err);
      // return cb(ERRORS.DB_ERROR.CLIENT_MSG, null);
      logger.error("Error!!!", err);
      return cb("Error!!!");
    }
    return cb(null, res);
  };
}

exports.create = function (col, fields, cb) {
  // Note create time of items
  fields._createDateTime = Date.now();

  $fh.db({
    'act': 'create',
    'type': col,
    'fields': fields
  }, dbCb(cb));
};

exports.createAll = function (col, list, cb) {
  var funcs = [];
  for (var i = 0; i < list.length; i++) {
    funcs.push(getCreate(col, list[i]));
  };
  async.series(funcs, cb);

  function getCreate(collection, fields) {
    return function (callback) {
      fields._createDateTime = Date.now();
      exports.create(collection, fields, callback)
    }
  }
};

exports.read = function (col, guid, cb) {
  $fh.db({
    'act': 'read',
    'type': col,
    guid: guid
  }, dbCb(cb));
};

exports.update = function (col, guid, fields, cb) {
  // Track when items are updated
  // fields._lastModified = Date.now();

  $fh.db({
    'act': 'update',
    'type': col,
    'fields': fields,
    guid: guid
  }, dbCb(cb));
};

exports.list = function (col, restrictions, cb) {
  var params = {
    'act': 'list',
    'type': col
  };

  if (restrictions && typeof restrictions === 'function') {
    cb = restrictions;
    restrictions = null;
  } else if (restrictions) {
    params = _.extend(params, restrictions);
  }
  $fh.db(params, dbCb(cb));
};

exports.listFields = function (col, restrictions, fields, cb) {
  var params = {
    'act': 'list',
    'type': col,
    'fields': fields
  };
  params = _.extend(params, restrictions);

  $fh.db(params, dbCb(cb));
};

var removeAll = exports.removeAll = function (col, cb) {
  $fh.db({
    'act': 'deleteall',
    'type': col
  }, dbCb(cb));
};

exports.removeAllCollections = function (callback) {
  var collections = [
    'Application',
    'Task',
    'User'
  ];

  // callback = callback || noop;

  async.eachSeries(collections, function (col, cb) {
    logger.info('Removing collection %s', col);
    removeAll(col, cb);
  }, function (err) {
    callback(err);
  });
};

exports.genericQuery = function (query, cb) {
  $fh.db(query, cb);
};

var remove = exports.remove = function (col, guid, cb) {
  $fh.db({
    'act': 'delete',
    'type': col,
    guid: guid
  }, dbCb(cb));
};

/**
 * Iterate hourly and delete - avoids memory issues
 *
 * Start at startTs and add an hour to get a date range.
 * Using this date range delete all the collection records.
 *
 * Stop when we reach endTs OR fiveDaysAgo.
 */
exports.deleteRecordsInDateRange = function (collection, startTs, endTs, cb) {

  var oneHourInMilliSeconds = 3600000;
  var funcs = [];

  // ensure we dont delete anything that was created in the last 5 days
  var fiveDaysAgo = new Date();
  fiveDaysAgo = fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  var iterateStart = startTs;
  var iterateEnd = startTs + oneHourInMilliSeconds;

  while (iterateEnd < endTs && iterateEnd < fiveDaysAgo) {
    funcs.push(doRemove(iterateStart, iterateEnd, collection));
    iterateStart = iterateEnd;
    iterateEnd = iterateEnd + oneHourInMilliSeconds;
  }

  async.series(funcs, function (err) {
    if (err) {
      logger.error('Something went wrong in deleteRecordsInDateRange %j', err);
    }
    cb(err);
  });

  function doRemove(start, end, collection) {
    return function (callback) {
      logger.info('Removing %s from %s to %s (from: %s to: %s)', collection, start, end, new Date(start), new Date(end));

      var restrictions = {
        'le': {
          '_createDateTime': end
        },
        'ge': {
          '_createDateTime': start
        }
      };

      exports.list(collection, restrictions, function (err, data) {
        if (err) {
          logger.error('Error tring to list in deleteRecordsInDateRange %j', err);
          callback(err);
        } else if (!data) {
          logger.info('No data returned in deleteRecordsInDateRange');
          callback();
        } else {
          var guids = _.pluck(data.list, 'guid');

          logger.info('Found %s records to delete', guids.length);

          async.eachLimit(guids, 10, function (guid, cb) {
            remove(collection, guid, cb);
          }, function (err) {
            if (err) {
              logger.error('Error deleting records %j', err);
            }
            logger.info('Finished removing records for %s', collection);
            callback(err);
          });
        }
      });

    };
  }
};

exports.createIndex = function (collection, index, cb) {
  cb = cb || noop;
  // Adding an index
  var options = {
    "act": "index",
    "type": collection,
    "index": index
  };
  $fh.db(options, dbCb(cb));
}
