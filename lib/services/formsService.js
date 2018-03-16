var mockForms = require('../dummyData/mockForms');

exports.createApplication = function (params, cb) {
  cb(null, {
    'applicationId': Math.floor(Math.random() * 1000)
  });
}

exports.getForms = function (params, cb) {
  cb(null, {
    'forms': mockForms.forms
  });
}

exports.updateApplication = function (params, cb) {
  cb();
}
