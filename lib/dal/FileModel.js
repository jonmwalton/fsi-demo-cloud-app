var collection = 'Files',
  logger = require('../logger'),
  _ = require('lodash'),
  Promise = require('bluebird');

var dal = Promise.promisifyAll(require('./dal.js'));

var noop = function () { };

exports.create = function (fields, cb) {
  cb = cb || noop;
  var ret = fields;
  fields.uploaded = true;
  dal.create(collection, fields, function (err, res) {
    if (err) {
      cb(err);
    } else {
      fields.guid = res.guid;
      delete fields._createDateTime;
      delete fields._id;
      cb(null, fields);
    }
  });
};

exports.get = function (restriction) {
  return dal.listAsync(collection, restriction);
};


exports.getByGUID = function (guid) {
  return dal.readAsync(collection, guid);
};

// exports.update = function (params, id) {
//     var restriction = {
//         'eq': {
//             'caseId': id
//         }
//     }
//     return dal.listAsync(collection, restriction)
//     .then(function(dbRecords){

//         if(dbRecords.count < 1){
//             return dal.createAsync(collection, params.data)
//         } else {
//             var fields = dbRecords.list[0].fields;
//             // Only update neceaasry fields.  When a case is closed or cancelled
//             // case variables anr not availble wo want to keep the last values
//             // rather than overwriting with nulls
//             _.forOwn(params.data, function(value, key){
//                 fields[key] = value;
//             })

//             var guid = dbRecords.list[0].guid;

//             return dal.updateAsync(collection, guid, fields)
//         }

//     })

// };