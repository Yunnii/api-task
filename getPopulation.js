module.exports = function getPopulation(continentName, countriesInfo, citiesInfo, populationInfo) {
    var countriesInContinent = countriesInfo.reduce(function(res, country) {
        if (country.continent === continentName) {
            res[country.name] = country.name;
        }

        return res;
    }, {});

    var citiesInCountry = citiesInfo.reduce(function(res, city) {
        if(countriesInContinent.hasOwnProperty(city.country)) {
            res[city.name] = city.name;
        }

        return res;
    }, {});

    return populationInfo.reduce(function(count, population) {
        if(citiesInCountry.hasOwnProperty(population.name)) {
            count += population.count;
        }

        return count;
    }, 0);
};