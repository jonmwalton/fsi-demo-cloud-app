var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var bpm = require('../bpm/bpmPull');
var task = require('../bpm/taskRunner');
var notifications = require('../services/pushNotificationService');
var generic = require('../generic');
var constants = require('../constants');
var logger = require('../logger');
var bpmPull = require('../bpm/bpmPull');
var REST_STATUS_CODES = constants.REST_STATUS_CODES;



function validatePullCaseBody(req, res, next) {
  // TODO: add validation, should be minimum fields
  next();
}

function validateRunTaskBody(req, res, next) {
  // TODO: add validation, should be minimum fields
  next();
}

function validatePushBody(req, res, next) {
  // TODO: add validation, should be minimum fields
  next();
}


// req.body
// {
//   "caseId": "Cases"
// }
function pullBPMCase(req, res) {
  logger.info('fetching bpm data for case id', req.body.caseId);
  bpm.doUpdate(req.body)
    .then(function(result){
      logger.info('bpm update ok', result);
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(result);
    })
    .catch(function(err){
      logger.log('bpm update error', err);
      generic.sendError(req, res, err);
    })

}

// req.body
// {
// 	"taskId": 81,
// 	"caseId": 45,
// 	"taskOutput": {
// 		"input1": "wqe", 
// 		"input2": "qweqwe" 
// 	}
// }
function runTask(req, res) {
  logger.info('runnng task id', req.body);
  task.runTask(req.body)
    .then(function(result){
      logger.info('task id ' + req.body.taskId + ' for case Id ' + req.body.caseId + ' completed ok');
      doBPMPull(req, res, result, null);

      // res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(result)
    }).bind(this)
    .catch(function(err){
      logger.error('task id ' + req.body.taskId + ' for case Id ' + req.body.caseId + ' failed');
      doBPMPull(req, res, null, err)
      // generic.sendError(req, res, err);
    }).bind(this)
}

function doBPMPull(req, res, taskResult, taskError){
  bpmPull.doUpdate(req.body) // pull from bpm after update TODO remove this?
    .then(function(resultPull){
      logger.info('bpm update ok ', resultPull);
      if (taskResult){
        res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(taskResult);
      } else {
        generic.sendError(req, res, taskError)
      }
    })
    .catch(function(err){
      logger.log('bpm update error', err);
      generic.sendError(req, res, err)
    })
}

// req.body
// {
//  "alertMessage": "Action Required" 
// 	"taskId": 81,
// 	"caseId": 45,
//  "taskName": <task name>,
//  "userAlias": < case variable - userAlias >,
// 	"taskForm": <task form>,
//  "data": <data object>
// }
function sendPushNotification(req, res) {
  notifications.send(req.body)
    .then(function(result){
      logger.info('push notification sent ok ' , result);
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(result);
    }).bind(this)
    .catch(function(err){
      logger.error('push notification send failed  ' , err);
      generic.sendError(req, res, err);
    }).bind(this)
}



function bpmRoutes() {
  var bpm = new express.Router();
  bpm.use(cors());
  bpm.use(bodyParser());

  bpm.post('/pullCase', validatePullCaseBody, pullBPMCase);
  bpm.post('/runTask', validateRunTaskBody, runTask);
  bpm.post('/pushNotification', validatePushBody, sendPushNotification);

  return bpm;
}

module.exports = bpmRoutes;
