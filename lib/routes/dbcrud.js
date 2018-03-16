var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var dal = require('../dal/dal');
var bpm = require('../bpm/bpmPull');
var generic = require('../generic');
var constants = require('../constants');
var logger = require('../logger');
var REST_STATUS_CODES = constants.REST_STATUS_CODES;


function validateGetParams(req, res, next) {
  // TODO: validate that at least the application id exists
  next();
}

function validatePostBody(req, res, next) {
  // TODO: add validation, should be minimum fields
  next();
}

function validatePutBody(req, res, next) {
  // TODO: add validation, should be minimum fields
  next();
}

function create(req, res) {
  console.log('IN CREATE ');
  // expects 
  // {
  //   "collection": "name",
  //   "data": array or object
  // }
  dal.create(req.body.collection, req.body.data, function (err, dtls) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}


function listAll(req, res) {
  var collection = req.params.collection || req.query.collection;
  console.log('IN LISTALL ', collection);

  dal.list(collection, function (err, dtls) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

function find(req, res) {
  var collection = req.body.collection ;
  var restriction = req.body.restriction ;
  console.log('IN FIND ', collection);

  dal.list(collection, restriction, function (err, dtls) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

function update(req, res) {
  console.log('update id', req.params.uid);
  dal.update(req.body.collection, req.params.uid, req.body.data, function (err, dtls) {
    if (err) {
      console.log('update error', err);
      generic.sendError(req, res, err);
    } else {
      console.log('update ok', dtls);
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

// req.body
// {
//   "collection": "Cases"
// }
function remove(req, res) {
  console.log('remove id', req.params.uid);
  dal.remove(req.body.collection, req.params.uid, function (err, dtls) {
    if (err) {
      console.log('deete error', err);
      generic.sendError(req, res, err);
    } else {
      console.log('delete ok', dtls);
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

// req.body
// {
//   "collection": "Cases"
// }
function removeAll(req, res) {
  console.log('remove All', req.body.collection);
  dal.removeAll(req.body.collection, function (err, dtls) {
    if (err) {
      console.log('remove All error', err);
      generic.sendError(req, res, err);
    } else {
      console.log('remove All ok', dtls);
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

function dbcrudRoutes() {
  var dbcrud = new express.Router();
  dbcrud.use(cors());
  // dbcrud.use(bodyParser());
  dbcrud.use(bodyParser.json({limit: '50mb'}));
  dbcrud.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  dbcrud.post('/', validatePostBody, create);
  dbcrud.post('/find', validatePostBody, find);
  dbcrud.get('/', validateGetParams, listAll);
  dbcrud.get('/:collection', validateGetParams, listAll);
  dbcrud.put('/:uid', validatePutBody, update);
  dbcrud.delete('/:uid', validateGetParams, remove);
  dbcrud.delete('/', validateGetParams, removeAll);

  return dbcrud;
}

module.exports = dbcrudRoutes;
