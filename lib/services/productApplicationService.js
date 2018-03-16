var mockApplication = require('../dummyData/mockApplication');
var request = require('request-promise');
var bpm = require('../bpm/bpmCalls');
var cases = require('../dal/CaseModel');
var files = require('../dal/FileModel');
var mockProducts = require('../dummyData/mockProducts');
var logger = require('../logger');
var _ = require('lodash');

function addProduct(applications) {
  var products = mockProducts.products;

  _.forEach(applications.list, function (app) {
    var product = _.filter(products, { 'id': app.fields.productId })
    if (_.isArray(product) && product.length === 1) {
      app.fields.productObj = product[0];
    } else {
      app.fields.productObj = products[2];
    }
  });

  // console.log('apps', applications)
  return applications;

}

function addFiles(applications, cb) {
  _.forEach(applications.list, function (app) {
    var caseData = app.fields;//.map(app, 'fields');
    var caseId = caseData.caseId;

    var filter = {
      'eq': {
        'caseId': caseId
      }
    };

    files.get(filter)
      .then(function (files) {
        // console.log('caseId='+caseId, files);
        if (files && files.count > 0) {
          app.fields.Application.files = [];
          app.fields.Application.files = _.map(files.list, 'fields');
          // console.log(caseData.application.files)

        }
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  cb(applications)
}

exports.createApplication = function (params, cb) {
  logger.debug('request params ', params.body);

  bpm.createCase(params.body)
    .then(function (res) {
      cb(null, { id: res });
    })
    .catch(function (err) {
      cb(err, null);
    })

}

exports.getApplications = function (req, cb) {
  cases.get()
    .then(function (res) {
      cb(null, addProduct(res));
    })
    .catch(function (err) {
      cb(err, null);
    })
}


exports.getApplicationsByValue = function (field, value, cb) {
  var restriction = {
    'eq': {}
  }
  restriction.eq[field] = value;
  cases.get(restriction)
    .then(function (res) {
      addFiles(res, function (applications) {
        // console.log(application);
        cb(null, addProduct(applications));
      });
    })
    .catch(function (err) {
      cb(err, null);
    })
}

exports.updateApplication = function (params, cb) {
  cb();
}

exports.uploadApplicationDocs = function (params, cb) {
  files.create(params, function (err, res) {
    cb(err, res)
  });
}

exports.getAllApplicationDocs = function (caseId, cb) {
  var filter = {
    'eq': {
      'caseId': parseInt(caseId, 10)
    }
  };
  files.get(filter)
    .then(function (data) {
      cb(null, data);
    })
    .catch(function (err) {
      cb(err, null);
    })
}

exports.getDocument = function (guid, cb) {
  var filter = {
    'eq': {
      'guid': guid
    }
  };

  files.get(filter)
    .then(function (data) {
      cb(null, data);
    })
    .catch(function (err) {
      cb(err, null);
    })
}

exports.getDocumentByGUID = function (guid, cb) {
  files.getByGUID(guid)
    .then(function (data) {
      cb(null, data);
    })
    .catch(function (err) {
      cb(err, null);
    })
}
