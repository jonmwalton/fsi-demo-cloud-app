var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var constants = require('../constants');
var REST_STATUS_CODES = constants.REST_STATUS_CODES;
var userModel = require('../dal/UserModel');
var generic = require('../generic');

function validatePostParams(req, res, next) {
  if (!req.body.username || req.body.username === '') {
    res.status(REST_STATUS_CODES.BAD_REQUEST).send({
      'errorCode': 'bad_request',
      'errorDescription': 'No username provided'
    });
  } else if (!req.body.password || req.body.password === '') {
    res.status(REST_STATUS_CODES.BAD_REQUEST).send({
      'errorCode': 'bad_request',
      'errorDescription': 'No password provided'
    });
  } else {
    next();
  }
}

function login(req, res) {
  userModel.login(req.body.username, req.body.password, function (err) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_NO_CONTENT).send({});
    }
  });
}

function authRoute() {
  var auth = new express.Router();
  auth.use(cors());
  auth.use(bodyParser());

  auth.post('/login', validatePostParams, login);

  return auth;
}

module.exports = authRoute;
