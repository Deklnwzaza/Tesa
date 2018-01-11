var express = require('express');
var router = express.Router();
var http = require('http');
var async = require('async');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/alert', function(req, res, next) {
    res.render('lora/alert', { team_id: req.body.team_id, description: req.body.description });
});

/*router.get('/', function(req, res, next) {
    function getData(url, callback) {
        //There's no true asynchronous code here, so use process.nextTick
        //to prove we've really got it right
        process.nextTick(function () {
            var options = ({
                //host: 'loraiot.cattelecom.com',
                method: 'GET',
                //port: '443',
                //path: '/',
                //agent: agent,
                header: { 'Content-Type': 'application/json'}
            });
            options.url = url;
            request(options, function(err, res, body) {
                if (err) throw err;
                var data = JSON.parse(body);
                callback(null, data);
            });
        });
    }

    function done(error, result) {
        //res.send({result: result});
        var data = {};
        data.temperature = result[0].data;
        data.humidity = result[1].data;
        data.pressure = result[2].data;
        data.magnetometer = result[3].data;
        data.accelerometer = result[4].data;
        data.gyroscope = result[5].data;
        data.din1 = result[6].data;
        console.log("map completed. Error: ", error, " result: ", result);

    }
    async.map(['http://10.0.0.10/api/temperature/40/1','http://10.0.0.10/api/humidity/40/1'
        ,'http://10.0.0.10/api/pressure/40/1','http://10.0.0.10/api/magnetometer/40/1',
        'http://10.0.0.10/api/accelerometer/40/1','http://10.0.0.10/api/gyroscope/40/1',
        'http://10.0.0.10/api/din1/40/1'], getData, done);

    //res.render('index2', { title: 'Express' });
});*/

module.exports = router;
