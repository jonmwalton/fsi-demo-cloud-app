var fh = require('fh-mbaas-api');
var logger = require('../logger');
var Promise = require('bluebird');
var _ = require('lodash');


exports.update = function(params, id, cb) {
  var options = {
    'act': 'list',
    'type': params.collection, // Entity/Collection name
    'eq': {
      'caseId': id
    }
  };

  fh.db(options, function (err, dbRecords) {
    if (err) {
        console.error("Error from db list in update" + err);
        return cb(err);
    } 

    // if record is not found, bail out and create it   
    if(dbRecords.count < 1){
      return exports.create(params, cb)
    }
    var fields = dbRecords.list[0].fields;
    // Only update neceaasry fields.  When a case is closed or cancelled
    // case variables anr not availble wo want to keep the last values
    // rather than overwriting with nulls
    _.forOwn(params.data, function(value, key){
      fields[key] = value;
    })

    var guid = dbRecords.list[0].guid;
    options = {
      "act": "update",
      "type": params.collection,
      "guid": guid,
      "fields": fields
    };
    fh.db(options, function (err, data) {
      if (err) {
        logger.error(params.collection + ' db update error for id ' + data.fields.caseId, err);
        cb(err);
      } else {
        logger.log(params.collection + ' db update success for id ', data.fields.caseId);
        cb(null, {'status': 'ok', "caseId": data.fields.caseId});
      }
    });
  });
}

exports.updatePromise = Promise.promisify(exports.update);


exports.remove = function(params, id, cb) {
  var options = {
    'act': 'list',
    'type': params.collection, // Entity/Collection name
    'eq': {
      'caseId': id
    }
  };
  console.log('delete list for id', options)

  fh.db(options, function (err, cs) {
    if (err) {
        console.error("Error from db list in delete" + err);
        return cb(err);
    } 
    if(cs.count < 1){
      //returning success - no record found, must be already deleted
      logger.info('unable to find record for delete with case Id: '+ id);
      return cb(null, {'status': 'ok', "caseId": id});
    }

    var guid = cs.list[0].guid;
    options = {
      "act": "delete",
      "type": params.collection,
      "guid": guid,
    };
    fh.db(options, function (err, data) {
      if (err) {
        logger.error("Error from db delete " + err);
        cb(err);
      } else {
        logger.debug('success delete id ', data.fields.caseId);
        cb(null, {'status': 'ok', "caseId": data.fields.caseId});
      }
    });
  });
}

exports.removePromise = Promise.promisify(exports.remove)


exports.create = function(params, cb) {
  console.log('IN CREATE DAL ')
  // deleted ok now try add
  var options = {
    "act": "create",
    "type": params.collection,
    "fields": params.data
  };

  fh.db(options, function (err, res) {
    if(err) {
      console.log(err.stack);
      console.log(new Date() + ' - Failed to create data via fh.db - ', err);
      return cb(err);
    }
    console.log('records created ok', res)
    return cb(null, res);
  });

}

exports.createPromise = Promise.promisify(exports.create) 


exports.clearCreate = function(params, cb) {

  // delete all first then add
  var options = {
    "act": "deleteall",
    "type": params.collection,
  };
  fh.db(options, function (err, delData) {
    if(err) {
      console.log(err.stack);
      console.log(new Date() + ' - Failed to delete all data via fh.db - ', err);
      return cb(err);
    }

    console.log('records deleted ok', delData)
    // deleted ok now try add
    options = {
      "act": "create",
      "type": params.collection,
      "fields": params.data
    };

    fh.db(options, function (err, res) {
      if(err) {
        console.log(err.stack);
        console.log(new Date() + ' - Failed to create data via fh.db - ', err);
        return cb(err);
      }
      console.log('records created ok', res)
      return cb(null, res);
    });

  });
}

exports.listAll = function(collection, cb) {
  console.log('in dal list all ', collection);
  var params = {
    'act': 'list',
    'type': collection
  };

  fh.db(params, function(err, data) {
    if (!err) {
      cb(null, data);
    } else {
      logger.error('MongoDB listAll error');
      logger.error('error', err);
      cb('MongoDB listAll error', null);
    }
  });
}
