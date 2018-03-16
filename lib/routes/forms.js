var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var formsService = require('../services/formsService');

var generic = require('../generic');
var constants = require('../constants');
var REST_STATUS_CODES = constants.REST_STATUS_CODES;

function getForms(req, res) {
  formsService.getForms(req, function (err, dtls) {
    if (err) {
      generic.sendError(req, res, err);
    } else {
      res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(dtls);
    }
  });
}

function formsRoute() {
  var forms = new express.Router();
  forms.use(cors());
  forms.use(bodyParser());

  forms.get('/', getForms);

  return forms;
}

module.exports = formsRoute;
