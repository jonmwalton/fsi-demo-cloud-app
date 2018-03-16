# FSI Demo
[![Dependency Status](https://img.shields.io/david/feedhenry-templates/helloworld-cloud.svg?style=flat-square)](https://david-dm.org/feedhenry-templates/helloworld-cloud)

## Node Version: 

+ 4.4.3

## To Run Locally
 
```
npm install

grunt serve
```
Thers's a bug in new **fh-mbaas-api** version 7 that causes an error when running in local mode when attempting to connect to mongo.  Hack to fix this is to replace `fh-cloud/node_modules/fh-mbaas-api/node_modules/fh-db/lib/utils.js` with <https://raw.githubusercontent.com/feedhenry/fh-db/6ef1044562a959e9b12bc6afac40c863badae691/lib/utils.js>



# Environment Variables
For debugging, set in Gruntfile.js for grunt or launch.json for vs code

__BPM_HOST, BPM_CONTAINER, BPM_PROCESS need to be configured according to the local and remote versions of BPM__

### FH_USE_LOCAL_DB
+ set to true to connect to locally running BPM instance

### FH_PORT
+ set to 8005 by default when running locally (8001 is used by locally running BPM)


### BPM_USE_DUMMY_DATA
+ set to true to return dummy data from sync framework (dummy data is in dummyData folder)

### BPM_AUTHORISATION
+ used to set authorisation for BPM.  Set to "Basic a2llc2VydmVyOnBhc3N3b3JkMSE=" by default which is Basic Authorisation for user kieserver/password1!


### BPM_HOST
   + local: *http://localhost:8080*
   + remote: *http://new-application-bpms-demo.int.open.paas.redhat.com*

### BPM_CONTAINER
   + local: *ApplicationManagement-1.7*
   + remote: *abca02da35dc8f2e6a54ccdf40609f22*

### BPM_CONTAINER_LOCAL
+ local: *ApplicationManagement-1.9*
+ remote: *com.rh.demo.bpm.NewApplication*



# APIs

### Create Case
`POST to /application with body containing applcation details along lines in /dummyData/mockApplication.js`

### Get List of all Applications stroed in mongo DB
`GET to /application`

### Get List of Applications stored in mongo DB for specific user
`GET to /application/user/<username>` where username is login username

### Get List of Applications stored in mongo DB for caseId
`GET to /application/id/<caseId>` where username is login username

### Pull Case / Task data from BPM
`POST to /bpm/pullCase with body {"caseId": <bpm process id>}`

### Run Task
`POST /bpm/runTask with body {"caseId": <bpm process id>, "taskId": <bpm task process id>, "taskOutput": <output from form capture for task>}`

### DB Crud
`/routes/dbcrud.js has a selection of endpoints for doing CRUD on the mongo collections`

### Push Notifications
`POST /bpm/pushNotification with body:`
```javascript
{
	"alertMessage": "FSI DEMO - Action Required",
	"taskId": 79,
	"caseId": 45,
	"taskName": "<task name>",
	"userAlias": "<user login name>"
	"taskForm": {
		"dummyField1": "wqe", 
		"dummyField2": "qweqwe" 
	},
	"data": "<data object>"
}
```


# SYNC FRAMEWORK / WORKFLOWS

### New Application

+ Consumer App hits Cloud endpoint to create new Application
+ Cloud calls BPM endpoint to create new case on BPM
+ When new case is created in BPM,  BPM hits Cloud endpoint with the new Case ID.
+ Cloud  pulls Case data from BPM and parses into separate Case and Task Collections in Mongo
+ Sync framework updates Case and Task tables in Admin App from the data in Mongo.

### Application Updates From Admin App

+ Admin App runs task, sets status to "pending" locally, records task form data and syncs update to Cloud.
+ Custom sync update handler in Cloud calls BPM endpoint to run task
+ If Task runs successfully, BPM hits Cloud Endpoint with Case Id.  Cloud then pulls data from BPM and updates Mongo with next Task.
+ It run Task fails with BPM a error, Cloud will automatically do a pull for the Case ID and update Mongo.
+ If run Task fails due to BPM unavailable, Cloud will return a Sync update fail and Client will handle this by showing error and resetting task status to "ready"
+ For steps 4/5 Cloud will sync Mongo update back to Admin App. Admin will show the next Task with Ready Status