var Promise = require('bluebird');
var bpm = require('../bpm/bpmCalls');
var notifications = require('../services/pushNotificationService');
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

var doTaskUri = {
    body: {body:"body"},
    headers:headers,
    json:true
};

var data, currentCall, taskId;
//set up enum for error handling
var restCalls = {
    GET_TASK: 0,
    PRE_RELEASE : 1,
    START: 2,
    COMPLETE: 3,
    RELEASE_AFTER_ERROR : 4
}


function startTask() {
    logger.debug('do start')
    // logger.debug(data)
    currentCall = restCalls.START;
    // doTaskUri.uri = process.env.BPM_HOST + '/kie-server/services/rest/server/containers/' + 
    //     process.env.BPM_CONTAINER + '/tasks/' + data.taskId + '/states/started';
    // doTaskUri.method = 'PUT';
    
    return bpm.doTaskAction('started', taskId)
        // .then(function(res) {
        //     // Send claimed call if ok then send started call
        //     logger.debug('start ok')
        //     return (res);
        // })
}


function completeTask() {
    logger.debug('do complete')
    return bpm.doTaskAction('completed', taskId, data.taskOutput)
        .then(function(res) {
            // Send claimed call if ok then send started call
            logger.debug(taskId + ' completed ok name: ' + data.taskName);
            if (data.taskName) {
                notifications.checkNotificationNeeded(data);
            }
            return ({result: taskId + ' completed successfully'});
        })
}

function releaseTask() {
    logger.debug('do release');
    currentCall = restCalls.PRE_RELEASE;
    // doTaskUri.uri =  process.env.BPM_HOST + '/kie-server/services/rest/server/containers/' + 
    //     process.env.BPM_CONTAINER + '/tasks/' + data.taskId + '/states/released';
    // doTaskUri.method = 'PUT';

    return bpm.doTaskAction('released', taskId)
        // .then(function(res) {
        //     // Send claimed call if ok then send started call
        //     logger.debug('released ok')
        //     return (res);
        // })
}


function handleError (err){
    logger.debug('in handle error')
    logger.debug(err.message);

    // if error is after release call theow error immediatley
    // otherwise if error after start or complete make a release call to be try and return task to READY status
    if (currentCall === restCalls.PRE_RELEASE ){
        err.taskMsg = 'Task not ready and release call failed';
        return Promise.reject(err);
    } else {


        // doTaskUri.uri = process.env.BPM_HOST + '/kie-server/services/rest/server/containers/' + 
        //     process.env.BPM_CONTAINER + '/tasks/' + data.taskId + '/states/released';
        // doTaskUri.method = 'PUT';

        return bpm.doTaskAction('released', taskId)
            .then(function(res) {
                // Send claimed call if ok then send started call
                logger.error('task released ok after error ')
                err.releasedOK = true;
                return Promise.reject(err); 
            })
            // .catch (function(error){
            //     logger.error('released error in handle error ', error.msg)
            //     return Promise.reject(err);
            // })
    }

}
    

exports.runTask = function (params) {
    logger.debug('runTask start ', params)
    data = params;
    taskId = data.taskId;
    currentCall = restCalls.GET_TASK;
    

    //check status
    // if complete return completed status
    // if not ready, send release
    // if ready run task

    //check status
    // doTaskUri.uri =  process.env.BPM_HOST + '/kie-server/services/rest/server/containers/' + 
    //     process.env.BPM_CONTAINER + '/tasks/' + data.taskId ;
    // doTaskUri.method = 'GET';

    return bpm.getTaskDetails(taskId)
        .then(function(res){
            logger.debug('task id ' + data.taskId + ' status: ' + res['task-status']);
            if (res['task-status']==='Completed') {
                var err = new Error('task is already completed');
                return Promise.reject(err);
            } else if (res['task-status'] === 'Ready') {
                return startTask()
                    .then(completeTask)
                    .catch(handleError);
            } else {
                // try sending release first
                 return releaseTask()
                    .then(startTask)
                    .then(completeTask)
                    .catch(handleError);
            }

        })

        .catch(function(err){
            //set error flags based on whcih cll failed
            if (currentCall === restCalls.GET_TASK){
                err.taskMsg = 'Call to retrieve task status failed';
            } else if (currentCall === restCalls.START){
                err.taskMsg = 'call to start task failed';
            } else if (currentCall === restCalls.COMPLETE){
                err.taskMsg = 'call to complete task failed';
            }

            return Promise.reject(err);
        })


};


// TEST SCENARIOS
// gettask call fails - display error message: unable to get Task Details
// task status is COMPLETE - display error message: task completed
// task status is not READY and release call fails - diplay error message task not ready, unable to release
// task status is READY and start call fails - display error message: unable to start task
// task status is READY and complete call fails - display error message: unable to complete task
// eveything works - get res back
