var mockDocument = require('../dummyData/mockDocument');

exports.createDocument = function (params, cb) {
  cb();
}

exports.getDocument = function (params, cb) {
  cb(null, mockDocument.document);
}
