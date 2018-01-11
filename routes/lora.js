var express = require('express');
var router = express.Router();
var http = require('http');
var async = require('async');
var request = require('request');
var lora = require("../controllers/LoraController.js");


router.get('/', function(req, res) {
    lora.list(req, res);
});

router.get('/temperature', function(req, res) {
    lora.getTemperature(req, res);
});

router.get('/pressure', function(req, res) {
    lora.getPressure(req, res);
});

router.get('/Humidity', function(req, res) {
    lora.getHumidity(req, res);
});

router.get('/Gyroscope', function(req, res) {
    lora.getGyroscope(req, res);
});

router.get('/Accelerometer', function(req, res) {
    lora.getAccelerometer(req, res);
});

router.get('/Magnetometer', function(req, res) {
    lora.getMagnetometer(req, res);
});

router.get('/Din1', function(req, res) {
    lora.getDin1(req, res);
});

router.post('/:value', function(req, res) {
    lora.getTime(req, res);
});

router.get('/create', function(req, res) {
    lora.save(req, res);
});

router.delete('/delete', function(req, res) {
    lora.delete(req, res);
});

module.exports = router;
