var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function localInit() {
  var lInit = new express.Router();
  lInit.use(cors());
  lInit.use(bodyParser());

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  lInit.post('/', function (req, res) {
    console.info(new Date().toUTCString(), 'In mock init route POST / req.body=', req.body);
    // NOTE::
    // Replace below ip addresses with wifi ip to point a device at local machine

    // see http://expressjs.com/4x/api.html#res.json
    res.json({
      'apptitle': 'fsi-local',
      'domain': 'fsi.mtma',
      'firstTime': false,
      'hosts': {
        'debugCloudType': 'node',
        'debugCloudUrl': 'http://127.0.0.1:8001',
        'releaseCloudType': 'node',
        'releaseCloudUrl': 'http://127.0.0.1:8001'
      },
      'init': {
        'trackId': 'HOTVCyUGKVRvhoBe_WeN66si-'
      },
      'status': 'ok'
    });
  });

  return lInit;
}

module.exports = localInit;
