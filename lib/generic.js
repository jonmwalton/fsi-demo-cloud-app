var constants = require('./constants');
var REST_STATUS_CODES = constants.REST_STATUS_CODES;
var ERROR_CODES = constants.ERROR_CODES;
var ERROR_DESCRIPTIONS = constants.ERROR_DESCRIPTIONS;
var logger = require('./logger');

exports.internalServerError = function (res, errorDescription, errorCode) {
  logger.info('Sending Internal server error back to client, code: 500');
  res.status(REST_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
    'errorCode': errorCode || '500',
    'errorDescription': errorDescription || 'Internal server error'
  });
}

exports.sendError = function (req, res, err) {
  logger.error('Err: ' + JSON.stringify(err));
  logger.error('Returning error %s, code: %s', res.errorDescription, res.errorCode);
  exports.internalServerError(res, res.errorDescription || err.message, res.errorCode || err.name);
}
