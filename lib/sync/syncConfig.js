var fhapi = require("fh-mbaas-api"),
  caseSyncHandler = require("./caseSyncHandler"),
  taskSyncHandler = require("./taskSyncHandler"),
  logger = require('../logger'),
  sync = fhapi.sync,
  i;

var syncCollections = [{
    // collection: 'Cases',
    // listHandler: caseSyncHandler.listCases,
    // readHandler: caseSyncHandler.readCase,
    // updateHandler: caseSyncHandler.updateCase,
    // doCollisionHandler: caseSyncHandler.doCaseCollision
  }, 
  {
    collection: 'Tasks',
    // listHandler: taskSyncHandler.listTasks,
    // createHandler: taskSyncHandler.createTask,
    // readHandler: taskSyncHandler.readTask,
    updateHandler: taskSyncHandler.updateTask,
    // doCollisionHandler: taskSyncHandler.doTaskCollision
  }];

  if(process.env.BPM_USE_DUMMY_DATA === true || process.env.BPM_USE_DUMMY_DATA === "true"){
    console.warn('Using Dummy Data for Sync !!!!!!!!!!!!!');

    syncCollections = [{
      collection: 'Cases',
      listHandler: caseSyncHandler.listCases,
      readHandler: caseSyncHandler.readCase,
      updateHandler: caseSyncHandler.updateCase,
      doCollisionHandler: caseSyncHandler.doCaseCollision
    }, 
    {
      collection: 'Tasks',
      listHandler: taskSyncHandler.listTasks,
      createHandler: taskSyncHandler.createTask,
      readHandler: taskSyncHandler.readTask,
      updateHandler: taskSyncHandler.updateTask,
      doCollisionHandler: taskSyncHandler.doTaskCollision
    }];
  }

function initCallback(sc) {
  return function () {
    if (sc.listHandler) {
      sync.handleList(sc.collection, sc.listHandler);
    }
    if (sc.updateHandler) {
      sync.handleUpdate(sc.collection, sc.updateHandler);
    }
    if (sc.createHandler) {
      sync.handleCreate(sc.collection, sc.createHandler);
    }
    if (sc.readHandler) {
      sync.handleRead(sc.collection, sc.readHandler);
    }
    if (sc.doCollisionHandler) {
      sync.handleCollision(sc.collection, sc.doCollisionHandler);
    }
  }
}


fhapi.events.on('sync:ready', function(){
  logger.debug('sync ready');
  var syncConfig = {
    queueMessagesTTL: 1800,
  };
  sync.setConfig(syncConfig);
  // startsync();
});

// function startsync() {
// if(process.env.FH_USE_LOCAL_DB) {
  var mongodbUrl = process.env.FH_MONGODB_CONN_URL;
  var redisUrl = "redis://127.0.0.1";

  logger.debug('mongo url ', mongodbUrl);

  sync.connect(mongodbUrl, {}, redisUrl, function (err) {
    if (err) {
      logger.info('Connection error for sync', err);
    } else {
      logger.info('sync connected successfully');

      for (i = 0; i < syncCollections.length; i++) {

        logger.debug('local syncCollections[i]::: ' + syncCollections[i]);
        logger.debug('local syncCollections[i].collection::: ' + syncCollections[i].collection);

        sync.init(syncCollections[i].collection, {
          'logLevel': 'error',
          'syncFrequency': 5
        }, initCallback(syncCollections[i]));
      }
    }
  });

// }



var globalRequestInterceptor = function(dataset_id, params, cb) {
  // This function will intercept all sync requests.
  // It is useful for checking client identities and
  // for validating authentication

    logger.debug('lib/sync.js - Intercepting request for dataset', dataset_id, 'with params');

  // Return a non null response to cause the sync request to fail.
  // This (string) response will be returned to the client, so
  // don't leak any security information.
  return cb(null);
}

sync.globalInterceptRequest(globalRequestInterceptor);
