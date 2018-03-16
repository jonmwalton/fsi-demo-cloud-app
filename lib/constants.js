'use strict';

module.exports = {
  'HOSTS': {
    'DEV': 'https://something',
    'PROD': 'https://something'
  },
  'ENDPOINTS': {},
  'REST_STATUS_CODES': {
    'OK_WITH_CONTENT': 200,
    'OK_RESOURCE_CREATED': 201,
    'OK_NO_CONTENT': 204,
    'BAD_REQUEST': 400,
    'UNAUTHORISED': 401,
    'RESOURCE_NOT_FOUND': 404,
    'CONFLICT': 409,
    'INTERNAL_SERVER_ERROR': 500,
    'TOO_MANY_REQUESTS': 429,
    'SERVICE_UNAVAILABLE': 503,
    'REQUEST_TIMEOUT': 408,
    'PRECONDITION_FAILED': 412
  },
  'DEPLOYMENT_ENVIRONMENTS': {
    'DEVELOPMENT': 'DEVELOPMENT',
    'PRODUCTION': 'PRODUCTION'
  },
  'ACTIONS' : {
    'SAVE_ALL': 0,
    'UPDATE': 1,
    'LIST_ALL': 2
  }

}
