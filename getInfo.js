var Promise = require('bluebird');
var getData = require('./api').getData;

module.exports  = function getInfo (request) {
    return new Promise(function (resolve, reject) {
        getData(request, function (error, data) {
            if (error) {
                reject(error);
            }

            resolve(data);
        });
    });
};