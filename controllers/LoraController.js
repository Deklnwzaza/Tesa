var mongoose = require("mongoose");
var Lora = require("../models/Lora");
var async = require('async');
var request = require('request');
var temperature = mongoose.model('temperature');
var accelerometer = mongoose.model('accelerometer');
var din1 = mongoose.model('din1');
var db = require('../models/DB');

var LoraController = {};

// Show list of employees
LoraController.list = function (req, res) {
    temperature.find({}).exec(function (err, lora) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //res.render("../views/lora/index", {data: lora});
            res.send({data: lora});
        }
    });
};

LoraController.getTime = function (req, res) {
    function getData(models, callback) {
        //There's no true asynchronous code here, so use process.nextTick
        //to prove we've really got it right
        process.nextTick(function () {
            models.find({},'_id date').sort({teamID: 'asc'}).exec(function (err, lora) {
                var date = [];
                var date_start = time_to_date(format_time(req.params.start));
                var date_stop = time_to_date(format_time(req.params.end));
                for(var i = 0; i < lora.length; ++i){
                    if(time_to_date(date_to_time(lora[i].date)) > date_start && time_to_date(date_to_time(lora[i].date)) < date_stop){
                        date.push(lora[i]._id);
                    }
                }
                models.find({_id : {$in: date}}).sort({teamID: 'asc'}).exec(function (err, data) {
                    callback(null, data);
                });
            });
        });
    }

    function done(error, result) {
        res.send({temperature: result[0], accelerometer: result[1], din1: result[2]});
    }
    async.map([temperature, accelerometer, din1], getData, done);
}

LoraController.save = function(req, res) {
    getDataTeam(34);
    getDataTeam(51);
    getDataTeam(61);
    getDataTeam(39);
    getDataTeam(48);
    getDataTeam(44);
    getDataTeam(46);
    getDataTeam(45);
    getDataTeam(25);
    getDataTeam(12);
    getDataTeam(24);
    getDataTeam(16);
    getDataTeam(11);
    getDataTeam(22);
    getDataTeam(27);
    getDataTeam(60);
    getDataTeam(49);
    getDataTeam(10);
    getDataTeam(28);
    getDataTeam(47);
    getDataTeam(29);
    getDataTeam(26);
    getDataTeam(19);
    getDataTeam(30);
    getDataTeam(23);
    getDataTeam(32);
    getDataTeam(31);
    getDataTeam(50);
    getDataTeam(14);
    getDataTeam(21);
    getDataTeam(38);
    getDataTeam(53);
    getDataTeam(18);
    getDataTeam(30);
    getDataTeam(37);
    getDataTeam(33);
    getDataTeam(13);
    getDataTeam(52);
    getDataTeam(64);
    getDataTeam(43);
    getDataTeam(40);
};

LoraController.delete = function (req, res) {
    temperature.remove({}, function(err) {
        if(err)
            return res.status(500).send('err')
    });
    accelerometer.remove({}, function(err) {
        if(err)
            return res.status(500).send('err')
    });
    din1.remove({}, function(err) {
        if(err)
            return res.status(500).send('err')
    });
}

LoraController.getTemperature = function(req, res) {
    temperature.find({}).sort({teamID: 'asc'}).exec(function (err, lora) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //res.send(lora);
            res.render("../views/lora/temperature", {data: lora});
        }
    });
};

LoraController.getPressure = function(req, res) {
    Lora.find({},'pressure' ).sort({created_at: 'desc'}).exec(function (err, lora) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //res.send({data: lora});
            res.render("../views/lora/pressure", {data: lora});
        }
    });
};

LoraController.getHumidity = function(req, res) {
    Lora.find({},'humidity').sort({created_at: 'desc'}).exec(function (err, lora) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/lora/humidity", {data: lora});
        }
    });
};

LoraController.getGyroscope = function(req, res) {
    Lora.find({},'gyroscope').sort({created_at: 'desc'}).exec(function (err, lora) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/lora/gyroscope", {data: lora});
        }
    });
};

LoraController.getAccelerometer = function(req, res) {
    accelerometer.find({}).sort({teamID: 'asc'}).exec(function (err, lora) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //res.send(lora);
            res.render("../views/lora/accelerometer", {data: lora});
        }
    });
};

LoraController.getMagnetometer = function(req, res) {
    Lora.find({},'magnetometer').sort({created_at: 'desc'}).exec(function (err, lora) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/lora/magnetometer", {data: lora});
        }
    });
};

LoraController.getDin1 = function(req, res) {
    din1.find({}).sort({teamID: 'asc'}).exec(function (err, lora) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/lora/din1", {data: lora});
        }
    });
};

var getDataTeam = function (team_id) {
    var options = ({
        method: 'GET',
        header: { 'Content-Type': 'application/json'}
    });

    /*options.url = 'http://10.0.0.10/api/pressure/' + team_id + '/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('pressure', data[data.length - 1]);
        }
    });*/

    options.url = 'http://10.0.0.10/api/temperature/' + team_id + '/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('temperature', data[data.length - 1]);
        }
    });

    /*options.url = 'http://10.0.0.10/api/humidity/' + team_id + '/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            insert_to_db('humidity', data[data.length - 1]);
        }
    });*/

    /*options.url = 'http://10.0.0.10/api/gyroscope/' + team_id + '/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('gyroscope', data[data.length - 1]);
        }
    });*/

    options.url = 'http://10.0.0.10/api/accelerometer/' + team_id +'/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('accelerometer', data[data.length - 1]);
        }
    });

    /*options.url = 'http://10.0.0.10/api/magnetometer/' + team_id + '/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('magnetometer', data[data.length - 1]);
        }
    });*/

    /*options.url = 'http://10.0.0.10/api/leds/' + team_id + '/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('leds', data[data.length - 1]);
        }
    });*/

    options.url = 'http://10.0.0.10/api/din1/'+ team_id +'/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('din1', data[data.length - 1]);
        }
    });

    /*options.url = 'http://10.0.0.10/api/din2/'+ team_id +'/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('din2', data[data.length - 1]);
        }
    });

    options.url = 'http://10.0.0.10/api/din3/'+ team_id +'/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('din3', data[data.length - 1]);
        }
    });

    options.url = 'http://10.0.0.10/api/din4/'+ team_id +'/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('din4', data[data.length - 1]);
        }
    });

    options.url = 'http://10.0.0.10/api/din5/'+ team_id +'/1';
    request(options, function(err, res, body){
        if (err) throw err;
        var data = JSON.parse(body).data;
        if(data != undefined){
            data[data.length - 1].teamID = team_id;
            insert_to_db('din5', data[data.length - 1]);
        }
    });*/
}

var getDataAllTeam = function (team_id) {
    function getData(url, callback) {
        //There's no true asynchronous code here, so use process.nextTick
        //to prove we've really got it right
        process.nextTick(function () {
            var options = ({
                method: 'GET',
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
            data.accelerometer = result[1].data;
            data.din1 = result[2].data;
            var lora = new Lora(data);
            lora.save(function(err) {
                if(err) {
                    console.log(err);
                    res.render("../views/lora/index");
                } else {
                    console.log("Successfully created an lora.");
                    //res.redirect("/lora");
                }
            });
        //return res.send({data: data});
        console.log("map completed. Error: ", error, " result: ", result);

    }
    async.map(['http://10.0.0.10/api/temperature/' + team_id + '/1', 'http://10.0.0.10/api/accelerometer/' + team_id + '/1',
        'http://10.0.0.10/api/din1/'+ team_id +'/1'], getData, done);
};

function insert_to_db(table, row){
    var schema = db.model(table);
    var data = new schema(row);
    data.save(function(err, result){
        if (err) throw(err);
    });
}

function date_to_time(date) {
    var time = date.split(' ')[1];
    return time;
}

function time_to_date(time) {
    var date = new Date('2018-01-11T' + time + 'Z');
    return date;
}

function format_time(time) {
    if(time.length == 3){
        time = "0" + time;
    }
    time = String(time).substring(0,2) + ":" + String(time).substring(2,4) + ":00";
    return time;
}


module.exports = LoraController;
