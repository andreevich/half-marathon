var express = require('express');
var getData = require('./lib/main');
var fs = require('fs');

var app = express();

app.get('/', function (req, res) {
    res.send('minsk half marathon 2015');
});

app.get('/getdata', function (req, res) {
    getData().then(function (a) {
        res.send('The data:\n' + a);
    })
});

app.get('/getsavedata', function (req, res) {
    fs.readFile("./app/times.json", 'utf8', function (err, contents) {
        if (err) {
            return console.log(err);
        }
        res.send(contents);
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
