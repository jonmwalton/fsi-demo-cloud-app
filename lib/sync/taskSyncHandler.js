'use strict';

var mockTasks = require('../dummyData/mockTasks');
var taskRunner = require('../bpm/taskRunner');
var bpmPull = require('../bpm/bpmPull');
var tasksModel = require('../dal/TaskModel');
var logger = require('../logger');

var noop = function () {};

function runTask(data){
  return taskRunner.runTask(data.fields)
}

exports.listTasks = function (dataset_id, data, meta_data, cb) {
  console.log('list tasks sync')
  cb(null, mockTasks.tasks);
};

exports.updateTask = function (dataset_id, uid, data, meta_data, cb) {
  if(process.env.BPM_USE_DUMMY_DATA === true || process.env.BPM_USE_DUMMY_DATA === "true"){
    mockTasks.tasks[uid] = data;
    return cb(null, mockTasks.tasks.uid);
  }

  // process:
  // set task staus to pending in db 
  // try to run task 
  // if task completes then bpm will send next task and db will update and SyncManager
  // if task fails with an error from bpm eg. task already completed or case cancelled 
  //   then we pull data from bpm autmatically, this will update db with whatever is happening and sync back
  // if task fails because bpm unavailable then set status to retry in db and that will sync back 

  var caseId = data.caseId;
  // if task had update run a task
  // check if task has status is Start
  // if it does change status to pending and run task
  // 
  logger.debug('updateTask ', uid, caseId, data);
  data.taskStatus = 'Pending';
  tasksModel.update({  //update db with status pending
      'collection': 'Tasks',
      'data': data
    }, caseId)
    .then(runTask) //run task
    .then(function(res){
      logger.info('Run task success for caseId ' + caseId, res);
      bpmPull.doUpdate({caseId: caseId}) // do a bpm pull
        .then(function(resUpdate){

          logger.info('BMP Pull OK for caseId ' + caseId);
          // update mongo by pulling from bpm
          cb(null, "task run success");

        })

      // logger.info('Run task success for caseId ' + caseId, res);
      // // update mongo by pulling from bpm
      // cb(null, "update success");

    })
    .catch(function(err){
      logger.error('Run task error');
      bpmPull.doUpdate({caseId: caseId}) //after run task fail pull in latest bpm sata in case task already complete
        .then(function(resUpdate){
          logger.error('Run task error, reset pull from bpm was ok for caseId ' + caseId, err);
          cb(null, "update ok");
        })
        .catch(function(errUpdate){
          err.bpmUpdateFail = true;
          logger.error('Run task error due to BPM unavailable, reset status in db to Retry ' + caseId);
          tasksModel.update({  //update db with status pending
            'collection': 'Tasks',
            'data': {taskStatus:'Retry'}
          }, caseId)
            .then(function(res){
              // update mongo by pulling from bpm
              logger.error('Run task error, reset pull from bpm failed for caseId ' + caseId, err);
              cb(err, null);
            })
        })
    })
  
};

exports.readTask = function (dataset_id, uid, meta_data, cb) {
  console.log('update task uid ', uid)
  cb(null, mockTasks.tasks.uid);
};

exports.doTaskCollision = function (dataset_id, hash, timestamp, uid, pre, post, meta_data) {
  console.log('%s: Collision on Task, pushing through update with post record.', dataset_id);
  exports.updateTask(dataset_id, uid, post, noop);
};
