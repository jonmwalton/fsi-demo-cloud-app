var Promise = require('bluebird');
var request = require('request-promise');
var logger = require('../logger');
var bpmCall = require('../bpm/bpmCalls');
// var dal = require('../db/dal');
var cases = require('../dal/CaseModel');
var tasks = require('../dal/TaskModel');
var caseParser = require('../bpm/caseParser');
var taskParser = require('../bpm/taskParser');
var caseId;
var caseDetails, caseVars, taskDetails, taskForm

// Get Case Details and Case Variabls
// If Case open get tasks else delete tasks from Tasks DB 
// update Cases Table
// update Tasks Table

// TODO handle cases that are complete or cancelled
// These will have Variables or Tasks so just need to update selected fields 
// and delete tasks in table


exports.doUpdate = function(params) {
  caseDetails=null; caseVars=null; taskDetails=null; taskForm=null;
  caseId = parseInt(params.caseId, 10)
  logger.info('pulling data from bpm for caseId ', caseId);
  return getCaseDetails(caseId)
    .then(getCaseVariables)
    .then(getTaskDetails)
    .then(updateCasesDB)
    .then(updateTasksDB)
    .then(function(res){
      var msg = 'database updated successfully with bpm data for caseId: ' + caseId;
      return Promise.resolve({'result':msg})
    })
}

function getCaseDetails(caseId) {
  return bpmCall.getCaseDetails(caseId)
}

function getCaseVariables(data) {
  caseDetails = data;
  //if case is complete or cancelled only neet to make casedetails call, variables call will fail
  if (caseDetails['process-instance-state'] === 2 || caseDetails['process-instance-state'] === 3){
    return Promise.resolve();
  } else {
    return bpmCall.getCaseVariables(caseId)
  }

}

function getTaskDetails(data) {
  caseVars = data;
  // if status is not open, no need to pull task data, need to delete tasks from table in updateTasksDB
  if (caseDetails['process-instance-state'] !== 1){
    // caseData({'deleteTasks': true})
    return Promise.resolve()
  } else {
    //TODO handle multiple tasks
    var taskId = caseDetails['active-user-tasks']['task-summary'][0]['task-id']
    return Promise.all([bpmCall.getTaskDetails(taskId), bpmCall.getTaskForm(taskId)])
  }
}

function updateCasesDB(data){
  if(data){
    taskDetails = data[0];
    taskForm  = data[1];
  }
  return cases.update({
    'collection': 'Cases',
    'data': caseParser.parseCase(caseId, caseDetails, caseVars, taskDetails, taskForm)
  }, caseId)
}

function updateTasksDB(data){
  if(taskDetails){
    return tasks.update({
      'collection': 'Tasks',
      'data': taskParser.parseTask(caseId, caseDetails, caseVars, taskDetails, taskForm)
    }, caseId)
  } else {  
    //remove all tasks for thsi case
    return tasks.remove({'collection': 'Tasks'}, caseId);
  }

}