var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mockProducts = require('../dummyData/mockProducts');
var constants = require('../constants');
var REST_STATUS_CODES = constants.REST_STATUS_CODES;

function getProducts(req, res) {
  res.status(REST_STATUS_CODES.OK_WITH_CONTENT).send(mockProducts.products);
}

function productsRoute() {
  var products = new express.Router();
  products.use(cors());
  products.use(bodyParser());

  products.get('/', getProducts);

  return products;
}

module.exports = productsRoute;
