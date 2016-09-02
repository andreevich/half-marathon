'use strict';

module.exports = function () {
    return function (value) {
        let data = value;
        data.sort(function (a, b) {
            return a.absolutePlase * 1 - b.absolutePlase * 1;
        });
        return {
            getCount: ()=> data.length,
            getData: ()=> data,
            getBest: ()=> data[0],
            getWorst: ()=> data[data.length - 1],
            getSex: ()=> {
                let sex = {
                    male: 0,
                    female: 0
                };

                data.map(function (el) {
                    if (el.sex === 'м') {
                        sex.male++;
                    }
                    else {
                        sex.female++;
                    }
                });

                return sex;
            }
        }
    }
};