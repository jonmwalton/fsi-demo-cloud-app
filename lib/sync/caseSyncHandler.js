'use strict';
var request = require('request-promise');
var Promise = require('bluebird');
var _ = require('lodash');

// var db = require('../db/databrowser');
var casesArr;
var mockCases = require('../dummyData/mockCases');
var logger = require('../logger');
var constants = require('../constants');

var noop = function () {};

exports.listCases = function (dataset_id, data, meta_data, cb) {

  logger.debug('list cases sync')
  cb(null, mockCases.cases);
};

exports.updateCase = function (dataset_id, uid, data,  meta_data, cb) {
  logger.debug('update case uid ', uid)

  mockCases.cases[uid] = data;
  cb(null, mockCases.cases.uid);
};

exports.readCase = function (dataset_id, uid,  meta_data, cb) {
  cb(null, mockCases.cases.uid);
};

exports.doCaseCollision = function (dataset_id, hash, timestamp, uid, pre, post, meta_data) {
  logger.debug('%s: Collision on Case, pushing through update with post record.', dataset_id);
  exports.updateCase(dataset_id, uid, post, meta_data, noop);
};
