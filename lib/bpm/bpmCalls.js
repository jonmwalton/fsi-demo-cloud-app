var mockApplication = require('../dummyData/mockApplication');
var request = require('request-promise');
var logger = require('../logger');


function getEnvVar(param) {

  return process.env.FH_USE_LOCAL_DB === true ||  process.env.FH_USE_LOCAL_DB === 'true' ? 
    (process.env[param+'_LOCAL'] ? process.env[param+'_LOCAL'] : process.env[param]) :
    process.env[param];

}

var headers = {
    accept: 'application/json',
    authorization: getEnvVar('BPM_AUTHORISATION'),
    'content-type': 'application/json'
};

// create call using body
exports.createCase = function(params) {    
  var uri = getEnvVar('BPM_HOST') + '/kie-server/services/rest/server/containers/' +
    getEnvVar('BPM_CONTAINER') + '/processes/' +  getEnvVar('BPM_PROCESS') +  '/instances';

  var caseCreateReq = {
    uri: uri,
    body: params || mockApplication.application, //TODO replace with params
    method: 'POST',
    headers: headers,
    json:true
  };

  logger.debug('createCase request params ', caseCreateReq);

  // return request promise
  return request(caseCreateReq);

}

exports.getCaseDetails = function(caseId) {    
  var uri = getEnvVar('BPM_HOST') + '/kie-server/services/rest/server/queries/processes/instances/' + caseId

  var getCaseDetailsReq = {
    uri: uri,
    method: 'GET',
    headers: headers,
    json:true
  };

  logger.debug('getCaseDetails request params ', getCaseDetailsReq);

  // return request promise
  return request(getCaseDetailsReq);

}

exports.getCaseVariables = function(caseId) {    
  var uri = getEnvVar('BPM_HOST') + '/kie-server/services/rest/server/containers/' + 
    getEnvVar('BPM_CONTAINER') + '/processes/instances/' + caseId + '/variables'

  var getCaseVarsReq = {
    uri: uri,
    method: 'GET',
    headers: headers,
    json:true
  };

  logger.debug('request params ', getCaseVarsReq);

  // return request promise
  return request(getCaseVarsReq);

}

exports.getTaskDetails = function(taskId) {    
  var uri = getEnvVar('BPM_HOST') + '/kie-server/services/rest/server/containers/' +
    getEnvVar('BPM_CONTAINER') + '/tasks/' + taskId 

  var getTaskDetailsReq = {
    uri: uri,
    method: 'GET',
    headers: headers,
    json:true
  };

  logger.debug('getTaskDetails request params ', getTaskDetailsReq);

  // return request promise
  return request(getTaskDetailsReq);

}

exports.getTaskForm = function(taskId) {    
  var uri = getEnvVar('BPM_HOST') + '/kie-server/services/rest/server/containers/' +
  getEnvVar('BPM_CONTAINER') + '/forms/tasks/' + taskId;

  var getTaskFormReq = {
    uri: uri,
    method: 'GET',
    headers: headers,
    json:true
  };

  logger.debug('getTaskForm request params ', getTaskFormReq);

  // return request promise
  return request(getTaskFormReq);

}


exports.doTaskAction = function(action, taskId, body) { 
  // TODO validate that action is one of: 
  // 'claimed' || 'started' || 'completed' || 'released'   

  

  var uri = getEnvVar('BPM_HOST') + '/kie-server/services/rest/server/containers/' +
  getEnvVar('BPM_CONTAINER') + '/tasks/' + taskId + '/states/' + action;

  var getTaskActionReq = {
    uri: uri,
    method: 'PUT',
    headers: headers,
    json:true
  };

  if(action === 'completed'){ // for complete call add data
    getTaskActionReq.body = body;
  }

  logger.debug('do task action request params ', getTaskActionReq);

  // return request promise
  return request(getTaskActionReq);

}
