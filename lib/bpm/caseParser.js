
var products = require('../dummyData/mockProducts');
var logger = require('../logger');
var _ = require('lodash');

function parseStatusList(statusList) {
  var progress = [];
  var steps = [
    "Case Created",
    "Validated",
    "Acknowledged",
    "Fraud Checked",
    "Owner Assigned",
    "Application Check OK",
    "Documents Requested",
    "Interview Requested",
    "Interview Confirmed",
    "Final Approval",
  ]

  _.forEach(steps, function(step){
    progress.push({
       // The task list will represent the simplified UI representation of the processes. Other task details can be retrieved using the task id
       "name": step,
       "status": statusList[step]['org.demo.jbpm.mobile.models.Status'].status,
       "dateCompleted" : statusList['Case Created']['org.demo.jbpm.mobile.models.Status'].dateCompleted,
       "dateStarted": statusList['Case Created']['org.demo.jbpm.mobile.models.Status'].dateStarted
    })
  })

  return progress;

}

function getStatus(num){
  var status = [
    'Pending',
    'Open',
    'Complete',
    'Cancelled', 
    'Paused'
  ]
  _.isNumber(num)
  return _.isNumber(num) ? status[num] : '-';
}

function getName(caseVars){
  return caseVars.Application.personalDetails.name ? 
    ( caseVars.Application.personalDetails.name.salutation + ' ' +
    caseVars.Application.personalDetails.name.givenName + ' ' +
    (caseVars.Application.personalDetails.name.middleName.length > 0  ?  caseVars.Application.personalDetails.name.middleName + ' ' : '') +
    caseVars.Application.personalDetails.name.surname ) : '';
}

function getProduct(id, field){
  var prod = _.find(products.products, {'id': id})
  return prod?prod[field]:null;
}

exports.parseCase = function(caseId, caseDetails, caseVars, taskDetails, taskForm) {
 
  var caseRecord = {
    "caseId": caseId,
    "dateCreated": caseDetails['start-date'] || "",
    "status":   getStatus(caseDetails['process-instance-state'] ),

    // "caseComments": [{
    //   "comment": "This is a comment",
    //   "timestamp": "",
    //   "author": "ADMIN" // CONSUMER
    // }],
  }

  if(caseVars){
    var varsData = {
      "Application": caseVars.Application || null,
      "applicationType": caseVars.applicationType || "",
      "currentTaskOwner": caseVars.taskOwner || '',
      "assignedTo" : caseVars.assignedTo || "",
      "userAlias" : caseVars.userAlias || "",
      "pushAlias" : caseVars.pushAlias || "",
      "interviewDate": caseVars.interviewDate || "",
      "newProductName": caseVars.newProductName || "",
      "rejected": caseVars.finalApproval === false ? true : false,
      "productId": caseVars.Application ? caseVars.Application.productId : 1,
      "product" : caseVars.Application ? getProduct(caseVars.Application.productId || 1, 'type') : null,
      "productType": caseVars.Application ? getProduct(caseVars.Application.productId || 1, 'productType') : null,
      "uploadedDocs": caseVars.uploadedDocs || [],
      // "progress": caseVars.progressIndicator || []
      "progress": caseVars.statusList ? parseStatusList(caseVars.statusList) : 
        [{ // The task list will represent the simplified UI representation of the processes. Other task details can be retrieved using the task id
          "name": "Case Created",
          "status": "COMPLETE", // FAILED | IN_PROGRESS
          "dateCompleted" : 1504044949141,
        }, {
          "name": "Validated",
          "status": "COMPLETE", // FAILED | IN_PROGRESS
          "dateCompleted" : 1504044949141,
        }, {
          "name": "Acknowledged",
          "status": "COMPLETE", // FAILED | IN_PROGRESS
          "dateCompleted" : 1504044949141,
        }, {
          "name": "Fraud Checked",
          "status": "COMPLETE", // FAILED | IN_PROGRESS
          "dateCompleted" : 1504044949141,
        }, {
          "name": "Owner Assigned",
          "status": null,
          "dateCompleted" : null,
        }, {
          "name": "Application OK",
          "status": null,
          "dateCompleted" : null,
        }, {
          "name": "Documents Requested",
          "status": null,
          "dateCompleted" : null,
        }, {
          "name": "Interview Requested",
          "status": null,
          "dateCompleted" : null,
        }, {
          "name": "Interview Confirmed",
          "status": null,
          "dateCompleted" : null,
        }, {
          "name": "Application Approved",
          "status": null,
          "dateCompleted" : null,
        }],
    }
    if(caseVars.Application.personalDetails){
      var details = {
        "applicantName":  getName(caseVars),
        // "applicantEmail":  caseVars.personalDetails.email ? caseVars.personalDetails.email.emailAddress : "",
        // "applicantContactNum":  caseVars.personalDetails.phone ? caseVars.personalDetails.phone.phoneNumber : ""
      }
      _.extend(varsData, details);
    } else {
      var varsData = {
        "currentTaskOwner":  '',
        "interviewDate": null
      }
    }
  
    _.extend(caseRecord, varsData);
  }

  if(taskDetails){
     taskForm.form.confirmInterview = [ 
         "2017-12-13T09:00:00Z", 
              "2017-12-13T10:00:00Z"
         /*
              "2017-09-04T09:00:00Z", 
              "2017-09-04T10:30:00Z", 
              "2017-09-04T13:30:00Z", 
              "2017-09-05T09:45:00Z", 
              "2017-09-05T10:30:00Z", 
              "2017-09-05T12:30:00Z", 
              "2017-09-06T10:00:00Z", 
              "2017-09-06T10:30:00Z", 
              "2017-09-06T11:00:00Z"
              */
          ];
    taskForm.form.displayMode = "default";
    taskForm.form.name = "confirmInterview-taskform.form",
    taskForm.form.status =  0

    var taskRecord = {
      "currentTaskName": taskDetails['task-name'] || '',
      "currentTaskId": taskDetails['task-id'] || '',
      "currentTaskStatus":  taskDetails['task-status'] || '',
      "currentTaskForm": taskForm
    }
    _.extend(caseRecord, taskRecord);
  } else {
    var taskRecord = {
      "currentTaskName":  '',
      "currentTaskId":  '',
      "currentTaskStatus":   '',
      "currentTaskForm": null
    }
    _.extend(caseRecord, taskRecord);
  }
    


  logger.debug('bpm parsed case record :', caseRecord)

  return caseRecord;
}


// example data objects
// 
// caseDetails:
// {
//     "initiator": "kieserver",
//     "process-instance-id": 61,
//     "process-id": "com.rh.demo.bpm.NewApplication",
//     "process-name": "NewApplication",
//     "process-version": "1.0",
//     "process-instance-state": 1,
//     "container-id": "ApplicationManagement-1.7",
//     "start-date": 1504038592000,
//     "process-instance-desc": "NewApplication",
//     "correlation-key": "",
//     "parent-instance-id": -1,
//     "active-user-tasks": {
//         "task-summary": [
//             {
//                 "task-id": 99,
//                 "task-name": "Offer New Product",
//                 "task-description": "",
//                 "task-priority": 0,
//                 "task-actual-owner": "",
//                 "task-created-by": "",
//                 "task-created-on": 1504038592000,
//                 "task-activation-time": 1504038592000,
//                 "task-proc-inst-id": 61,
//                 "task-proc-def-id": "com.rh.demo.bpm.NewApplication",
//                 "task-container-id": "ApplicationManagement-1.7"
//             }
//         ]
//     }
// }
//
//
// caseVars
// {
//   "applicationType" : "PERSONAL",
//   "taskOwner" : "Bank",
//   "userAlias" : "user1",
//   "pushAlias" : "123",
//   "Application" : {
//     "personalDetails" : {
//       "name" : {
//         "salutation" : "Mr",
//         "givenName" : "Matthew",
//         "middleName" : "Du",
//         "surname" : "Hayden"
//       },
//       "demographics" : {
//         "gender" : "MALE",
//         "dateOfBirth" : "1972-09-15",
//         "birthPlace" : "Sydney",
//         "countryOfBirth" : "AU",
//         "nationality" : "AU"
//       },
//       "address" : [ {
//         "addressType" : "HOME_ADDRESS",
//         "addressLine1" : "40A Orchard Road",
//         "addressLine2" : "#99-99 Macdonald House",
//         "addressLine3" : "Orchard Avenue 2",
//         "addressLine4" : "Street 65"
//       } ],
//       "email" : {
//         "emailAddress" : "matt.hayden@gmail.com",
//         "okToEmail" : true
//       },
//       "phone" : {
//         "phoneNumber" : "64042321",
//         "okToSms" : true,
//         "okToCall" : true
//       }
//     },
//     "financialInformation" : {
//       "hasForeseeableFinancialChanges" : true,
//       "nonBankDebtObligationFlag" : true,
//       "expenseDetails" : [ {
//         "expenseType" : "COSTS_OF_LIVING",
//         "expenseAmount" : 590.25,
//         "frequency" : "MONTHLY"
//       } ],
//       "incomeDetails" : [ {
//         "incomeType" : "DECLARED_FIXED",
//         "fixedAmount" : 7590.25,
//         "variableAmount" : 1590.25,
//         "frequency" : "MONTHLY",
//         "otherIncomeDescription" : "Rent"
//       } ],
//       "existingLoanDetails" : [ {
//         "loanType" : "STUDENT_LOAN",
//         "otherDebtObligationType" : "Free text",
//         "monthlyInstallmentAmount" : 250.25,
//         "outstandingBalanceAmount" : 5000.25,
//         "loanAmount" : 15000.89,
//         "debtOwnership" : "JOINT",
//         "lenderName" : "KINROS CORPORATION"
//       } ]
//     },
//     "employmentDetails" : [ {
//       "employerName" : "Citi Bank",
//       "jobTitle" : "ACCOUNTANT",
//       "employmentDurationInYears" : 5,
//       "employmentStatus" : "EMPLOYED"
//     } ],
//     "creditDetails" : {
//       "creditAmount" : 23000.25,
//       "loanTakenIndicator" : true,
//       "monthlyRepaymentForAllExtLoans" : 5000.25
//     },
//     "companyDetails" : {
//       "companyName" : "RedHat",
//       "tradingYears" : "5",
//       "dunsNumber" : "123123123"
//     }
//   },
//   "additionalDocsRequired" : true,
//   "validApp" : true,
//   "assignedTo" : "Unassigned"
// }
//
//
//  taskDetails, 
// {
//     "task-id": 99,
//     "task-priority": 0,
//     "task-name": "Offer New Product",
//     "task-subject": "",
//     "task-description": "",
//     "task-form": "OfferNewProduct",
//     "task-status": "Ready",
//     "task-actual-owner": "",
//     "task-created-by": "",
//     "task-created-on": 1504038592000,
//     "task-activation-time": 1504038592000,
//     "task-skippable": true,
//     "task-workitem-id": 99,
//     "task-process-instance-id": 61,
//     "task-parent-id": -1,
//     "task-process-id": "com.rh.demo.bpm.NewApplication",
//     "task-container-id": "ApplicationManagement-1.7"
// }
//
//
// taskForm
// {
//     "form": {
//         "dataHolder": {
//             "id": "NewProductName",
//             "inputId": "NewProductName",
//             "name": "#E9E371",
//             "outId": "",
//             "type": "basicType",
//             "value": "java.lang.String"
//         },
//         "displayMode": "default",
//         "field": {
//             "errorMessage": "",
//             "fieldClass": "java.lang.String",
//             "fieldRequired": false,
//             "hideContent": false,
//             "id": 300644469,
//             "inputBinding": "CreditCard",
//             "isHTML": false,
//             "label": "New Product Name",
//             "name": "NewProductName",
//             "position": 0,
//             "readonly": true,
//             "title": "",
//             "type": "InputText"
//         },
//         "id": 1528990787,
//         "name": "OfferNewProduct-taskform.form",
//         "status": 0
//     }
// }
//
// progress indicator
// "progress": [{ // The task list will represent the simplified UI representation of the processes. Other task details can be retrieved using the task id
//         "name": "Case Created",
//         "status": "COMPLETE", // FAILED | IN_PROGRESS
//         "dateCompleted" : 1504044949141,
//       }, {
//         "name": "Validated",
//         "status": "COMPLETE", // FAILED | IN_PROGRESS
//         "dateCompleted" : 1504044949141,
//       }, {
//         "name": "Acknowledged",
//         "status": "COMPLETE", // FAILED | IN_PROGRESS
//         "dateCompleted" : 1504044949141,
//       }, {
//         "name": "Fraud Checked",
//         "status": "COMPLETE", // FAILED | IN_PROGRESS
//         "dateCompleted" : 1504044949141,
//       }, {
//         "name": "Owner Assigned",
//         "status": null,
//         "dateCompleted" : null,
//       }, {
//         "name": "Application OK",
//         "status": null,
//         "dateCompleted" : null,
//       }, {
//         "name": "Documents Requested",
//         "status": null,
//         "dateCompleted" : null,
//       }, {
//         "name": "Interview Requested",
//         "status": null,
//         "dateCompleted" : null,
//       }, {
//         "name": "Interview Confirmed",
//         "status": null,
//         "dateCompleted" : null,
//       }, {
//         "name": "Application Approved",
//         "status": null,
//         "dateCompleted" : null,
//       }]




