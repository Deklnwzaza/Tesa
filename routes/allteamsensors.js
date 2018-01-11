var express = require('express');
var router = express.Router();
var http = require('http');
var async = require('async');
var request = require('request');
var lora = require("../controllers/LoraController.js");

router.get('/', function(req, res) {
    lora.list(req, res);
});

router.get('/:start/:end', function(req, res) {
    lora.getTime(req, res);
});

module.exports = router;
