var Promise = require('bluebird');

var getPopulation = require('./getPopulation');
var getInfo = require('./getInfo');

Promise.all([
    getInfo('/countries'),
    getInfo('/cities'),
    getInfo('/populations')
]).spread(getPopulation.bind(null, 'Africa'))
    .then(function (count) {
        console.log('Total population in African cities: ' + count);
    })
    .error(function (err) {
        console.error(err);
    });