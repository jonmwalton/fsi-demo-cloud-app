var products = require('../dummyData/mockProducts');
var logger = require('../logger');
var _ = require('lodash');

exports.parseTask = function(caseId, caseDetails, caseVars, taskDetails, taskForm) {

  function getName(caseVars){
    return caseVars.Application && caseVars.Application.personalDetails && caseVars.Application.personalDetails.name ? 
      ( caseVars.Application.personalDetails.name.salutation + ' ' +
      caseVars.Application.personalDetails.name.givenName + ' ' +
      (caseVars.Application.personalDetails.name.middleName.length > 0  ?  caseVars.Application.personalDetails.name.middleName + ' ' : '') +
      caseVars.Application.personalDetails.name.surname ) : '';
  }

  function getProduct(id, field){
    var prod = _.find(products.products, {'id': id})
    return prod?prod[field]:null;
  }

  var taskRecord = {
    "taskId": taskDetails['task-id'],
    "taskName": taskDetails['task-name'] || '',
    "taskDescription": taskDetails['task-description'] || '',
    "caseId": caseId,
    "assignedTo": taskDetails['task-actual-owner'] || '',
    "taskStatus": taskDetails['task-status'] || '',
    "taskForm": taskForm
  }

  if(caseVars){
    var varsData = {
      "applicationType": caseVars.applicationType || "",
      "applicantName":  getName(caseVars),
      "product": caseVars.Application.productType || '',
      "currentTaskOwner": caseVars.taskOwner || '',
      "assignedTo" : caseVars.assignedTo || "",
      "userAlias" : caseVars.userAlias || "",
      "pushAlias" : caseVars.pushAlias || "",
      "productId": caseVars.Application ? caseVars.Application.productId : 1,
      "product" : caseVars.Application ? getProduct(caseVars.Application.productId || 1, 'type') : null,
      "productType": caseVars.Application ? getProduct(caseVars.Application.productId || 1, 'productType') : null,
    }
      _.extend(taskRecord, varsData);
  } else {
      var varsData = {
        "currentTaskOwner":  '',
      }
       _.extend(taskRecord, varsData);
    }
    
  logger.debug('bpm parsed task record :', taskRecord)

  return taskRecord;
}
