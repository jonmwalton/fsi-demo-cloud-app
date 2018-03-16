var $fh = require('fh-mbaas-api');
var logger = require('../logger');
var Promise = require('bluebird');

exports.sendPushNotification = function (params, cb) {
    logger.debug('in sending push notification')

    var message = {
        alert: params.alertMessage,
        userData: params
    };
    var options = {
        apps: [process.env.BPM_PUSH_NOTIFICATIONS_APP], // list of App IDs
        criteria: {
            deviceType: ['android'],
            alias: [params.pushAlias]
        }
        
    };
    logger.info('SENDING PUSH NOTICIFATION with options: ' +  JSON.stringify(options));
    logger.info('SENDING PUSH NOTICIFATION with message: ' +  JSON.stringify(message));
    $fh.push(message, options,
    function (err, res) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
};

exports.checkNotificationNeeded = function (data) {
    logger.debug('checkNotificationNeeded ', data.taskName)

    if (data.taskName === 'Application Check'){
        var params = {
            "alertMessage": "Action Required",
            "taskId": data.taskId,
            "caseId": data.caseId,
            "taskName": "Request Additional Documentation",
            "userAlias": data.userAlias,
            "pushAlias": data.pushAlias,
        }
        logger.debug('sending notification Application Check ', params)
        exports.sendPushNotification(params, function () {})
    } else if (data.taskName === 'Invite Customer For Interview'){
        var params = {
            "alertMessage": "Action Required",
            "taskId": data.taskId,
            "caseId": data.caseId,
            "taskName": "Confirm Interview",
            "userAlias": data.userAlias,
            "pushAlias": data.pushAlias,
        }
        logger.debug('sending notification Invite Customer For Interview ', params)
        exports.sendPushNotification(params, function () {})
    } else if (data.taskName === 'Final Approval'){
        var params = {
            "alertMessage": "Application Approved!",
            "taskId": data.taskId,
            "caseId": data.caseId,
            "taskName": "Final Approval",
            "userAlias": data.userAlias,
            "pushAlias": data.pushAlias,
        }
        logger.debug('sending notification Final Approval ', params)
        exports.sendPushNotification(params, function () {})
    } else if (data.taskName === 'Offer New Product'){
        var params = {
            "alertMessage": "Product Recommendation",
            "caseId": data.caseId,
            "taskName": "Offer New Product",
            "userAlias": data.userAlias,
            "pushAlias": data.pushAlias,
            "data": {
                "newProductName": "Clear Platinum Card",
                "newProductId": 6
            }
        }
        logger.debug('sending notification Request Additional Documentation ', params)
        exports.sendPushNotification(params, function () {})
    } else if (data.taskName === 'Confirm Interview'){
        var params = {
            "alertMessage": "Interview Confirmed",
            "caseId": data.caseId,
            "taskName": "Confirm Interview",
            "userAlias": data.userAlias,
            "pushAlias": data.pushAlias,
            "data": {
                "interviewDate": "12 Dec 2017 - 13:30"
            }
        }
        logger.debug('sending notification Confirm Interview ', params)
        exports.sendPushNotification(params, function () {})
    }
}

exports.send = Promise.promisify(exports.sendPushNotification);