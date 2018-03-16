var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var productApplicationService = require('../services/productApplicationService');
var generic = require('../generic');
var constants = require('../constants');
var logger = require('../logger');
var bpmPull = require('../bpm/bpmPull');
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

function postApplication(req, res) {
  productApplicationService.createApplication(req, function (err, dtls) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      logger.debug('Case Created OK ' + JSON.stringify(dtls));
      bpmPull.doUpdate({caseId: dtls.id}) // pull from bpm after update TODO remove this?
        .then(function(result){
          logger.info('bpm update ok ', result);
          dtls.msg = result;
          res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
        })
        .catch(function(err){
          logger.log('bpm update error', err);
          dtls.error = err;
          res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
        })

      // res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

function getApplications(req, res) {
  productApplicationService.getApplications(req, function (err, dtls) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

function getApplicationsByUser(req, res) {
  var user = req.params.user || req.query.user;
  productApplicationService.getApplicationsByValue('userAlias', user, function (err, dtls) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

function getApplicationsById(req, res) {
  var caseId = req.params.id || req.query.id;
  caseId = caseId ? parseInt(caseId, 10) : null;
  productApplicationService.getApplicationsByValue('caseId', caseId, function (err, dtls) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

function updateApplication(req, res) {
  productApplicationService.updateApplication(req, function (err) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_NO_CONTENT).send({});
    }
  });
}

function uploadApplicationDocs(req, res) {
  productApplicationService.uploadApplicationDocs(req.body, function (fail, success) {

    if (fail) {
      generic.sendError(req, res, fail);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(success);
    }
  });
}

function getAllApplicationDocuments(req, res) {
  var caseId = req.params.caseId || req.query.caseId;
  productApplicationService.getAllApplicationDocs(caseId, function (fail, success) {
    if (fail) {
      generic.sendError(req, res, fail);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(success);
    }
  });
}

function getDocument(req, res) {
  var guid = req.params.guid || req.query.guid;
  productApplicationService.getDocumentByGUID(guid, function (fail, success) {
    if (fail) {
      generic.sendError(req, res, fail);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(success);
    }
  });
}

function applicationRoute() {
  var application = new express.Router();
  application.use(cors());
  // application.use(bodyParser());
  application.use(bodyParser.json({limit: '50mb'}));
  application.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


  application.post('/file', validatePostBody, uploadApplicationDocs);
  application.post('/', validatePostBody, postApplication);
  application.get('/', validateGetParams, getApplications);
  application.get('/user/:user', validateGetParams, getApplicationsByUser);
  application.get('/file/:guid', validateGetParams, getDocument);
  application.get('/files/:caseId', validateGetParams, getAllApplicationDocuments);
  application.get('/id/:id', validateGetParams, getApplicationsById);
  application.put('/', validatePutBody, updateApplication);

  return application;
}

module.exports = applicationRoute;
