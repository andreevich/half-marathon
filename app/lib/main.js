"use strict";
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var ConsoleStatistic = require('./consoleStatistic')();
var CONSTANT = require('./constant');

var tr = [];
var urls = [];
var hashs = ['name', 'absolutePlase', 'number', 'placeSex', 'placeAge', 'sex', 'yearB', 'groupAge', 'country', 'club', 'time', 'time2', 'time3'];
var currentProgress = 0;

var promise = function (url, iteration) {
    return new Promise(function (resolve, reject) {
        request(url.url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body);
                var items = $('#results_list').find('tr');
                var list = {src: url.page, items: []};
                items.map(function (i, el) {
                    var item = $(this).find('td');
                    var tempObj = {};
                    item.map(function (i, el) {
                        var value = '';
                        if (i == 0) {
                            value = $(this).text().replace('скачать диплом', '').replace(/\n/g, '');
                        }
                        else {
                            value = $(this).text();
                        }
                        tempObj[hashs[i]] = value;
                    });

                    if (tempObj.hasOwnProperty('absolutePlase')) {
                        list.items.push(tempObj);
                        tr.push(tempObj);
                    }
                });
                currentProgress++;
                console.log((currentProgress / urls.length * 100).toFixed(0) + '% :' + CONSTANT.URL + url.page, list.items.length);
                resolve(list);
            }
            else {
                reject(error)
            }
        });
    });
};


for (var i = 1; i < 55; i++) {
    urls.push({url: CONSTANT.URL + i, page: i});
}

function run() {
    return Promise.all(urls.map(promise)).then(function (result) {
        fs.writeFile("./app/times.json", JSON.stringify(tr).replace(/\},/g, '},\n'), function (err) {
            if (err) {
                return console.log(err);
            }
        });
        new ConsoleStatistic(tr);
        return tr.length;
    }).catch(function (err) {
        console.log(err);
    });
}
module.exports = run;