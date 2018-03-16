var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var documentService = require('../services/documentService');
var generic = require('../generic');
var constants = require('../constants');
var REST_STATUS_CODES = constants.REST_STATUS_CODES;

function validateGetParams(req, res, next) {
  // TODO: validate that at least the document id exists
  next();
}

function validatePostBody(req, res, next) {
  // TODO: add validation, should be minimum fields
  next();
}

function postDocument(req, res) {
  documentService.createDocument(req, function (err) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_NO_CONTENT).send();
    }
  });
}

function getDocument(req, res) {
  documentService.getDocument(req, function (err, dtls) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

function documentRoute() {
  var doc = new express.Router();
  doc.use(cors());
  // doc.use(bodyParser());
  doc.use(bodyParser.json({limit: '50mb'}));
  doc.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  doc.post('/', validatePostBody, postDocument);
  doc.get('/', validateGetParams, getDocument);

  return doc;
}

module.exports = documentRoute;
