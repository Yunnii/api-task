var welcomePrompt = "Get population: \n1 Continent \n2 Country \n3 City \n4 Exit";
var choicePrompt = {
    1: 'Write continent:',
    2: 'Write country:',
    3: 'Write city:'
};

var Promise = require('bluebird');
var prompt = require('prompt');

var populationIndex = require('./getPopulation');
var getInfo = require('./getInfo');

var population;

Promise.all([
    getInfo('/countries'),
    getInfo('/cities'),
    getInfo('/populations')
]).spread(function(countries, cities, populations) {
        population = new populationIndex(countries, cities, populations);
        return population;
    })
    .then(userHello)
    .error(function (err) {
        console.error(err);
    });

function userHello(population) {
    prompt.start();
    console.log(welcomePrompt);

    prompt.get(['number'], function(err, choice) {
        if(err || !choice.number || (choice.number === 4)) {
            return;
        }

        console.log(choicePrompt[choice.number]);
        prompt.get(['name'], function(err, data) {
            if(err) {
                return;
            }

            var result;

            switch(parseInt(choice.number)) {
                case 1:
                    result = population.getPopulationByContinent(data.name);
                    break;
                case 2:
                    result = population.getPopulationByCountry(data.name);
                    break;
                case 3:
                    result = population.getPopulationByCity(data.name);
                    break;
            }

            console.log(result || 'There is no info');
        })
    });
}
