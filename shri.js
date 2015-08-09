var Promise = require('bluebird');

var populationIndex = require('./getPopulation');
var getInfo = require('./getInfo');

var population;

Promise.all([
    getInfo('/countries'),
    getInfo('/cities'),
    getInfo('/populations')
]).spread(function(countries, cities, populations) {
        population = new populationIndex(countries, cities, populations);
        console.log(population.getPopulationByContinent('Africa'));
    })
    .error(function (err) {
        console.error(err);
    });