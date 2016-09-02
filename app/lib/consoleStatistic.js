'use strict';
var Statistic = require('./function.js')();
var CONSTANT = require('./constant');
module.exports = function () {
    return function (value) {
        var st = new Statistic(value);

        console.log("");
        console.log("-------------* Half marathon 2015 Minsk *--------------------");
        console.log("All people: " + st.getCount());
        console.log("\tbest time: " + st.getBest().time, '| name: ' + st.getBest().name);
        console.log("\tmax time: " + st.getWorst().time, '| name: ' + st.getWorst().name);
        console.log("\tmale|female: " + st.getSex().male, '| ', st.getSex().female);
        console.log("");
        console.log("The data from site: " + CONSTANT.URL.substr(0, CONSTANT.URL.indexOf('?')));
        console.log("------------------------* - *-----------------------------");
    }

};