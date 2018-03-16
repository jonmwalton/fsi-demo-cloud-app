var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');

var Probe = require('./lib/probe');
var logger = require('./lib/logger');

// adding as get mongo connection error
setTimeout(function () {
  require('./lib/sync/syncConfig.js');
}, 3000);

// list the endpoints which you want to make securable here
var securableEndpoints;
securableEndpoints = ['/hello'];

var app = express();


var probe = new Probe(app, logger.info);
app.use(probe.hook);

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);




/* uncomment this code if you want to use $fh.auth in the app preview
 * localAuth is only used for local development.
 * If the app is deployed on the platform,
 * this function will be ignored and the request will be forwarded
 * to the platform to perform authentication.

app.use('/box', mbaasExpress.auth({localAuth: function(req, cb){
  return cb(null, {status:401, body: {"message": "bad request"}});
}}));

or

app.use('/box', mbaasExpress.core({localAuth: {status:401, body: {"message": "not authorised”}}}));
*/

if (process.env['FH_USE_LOCAL_DB']) {
  console.warn('Running Locally!!!!!!!!!!!!!');
  app.use('/box/srv/1.1/app/init', require('./lib/routes/localInit.js')());
} else {
  console.log('BPM_HOST is: ' + process.env.BPM_HOST);
  console.log('BPM_CONTAINER: is ' + process.env.BPM_CONTAINER);
  console.log('BPM_PROCESS is: ' + process.env.BPM_PROCESS);
  console.log('BPM_AUTHORISATION is: ' + process.env.BPM_AUTHORISATION);
}


// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

app.use('/application', require('./lib/routes/application.js')());
app.use('/document', require('./lib/routes/document.js')());
app.use('/forms', require('./lib/routes/forms.js')());
// app.use('/taskstatus', require('./lib/routes/taskstatus.js')());
app.use('/products', require('./lib/routes/products.js')());
app.use('/auth', require('./lib/routes/auth.js')());
app.use('/dbcrud', require('./lib/routes/dbcrud.js')());
app.use('/bpm', require('./lib/routes/bpm.js')());


// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function () {
  logger.info("App started at: " + new Date() + " on host: " + host + " on port: " + port);
});
