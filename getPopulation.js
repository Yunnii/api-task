var populationIndex = function (countries, cities, populations) {
    this.update(countries, cities, populations);
};

populationIndex.prototype.update = function (countries, cities, populations) {
    this.Cache = {
        cities: {},
        countries: {},
        continents: {}
    };

    this.countries = countries;
    this.cities = cities;
    this.populations = populations;

    this.preBuild();
};

populationIndex.prototype.preBuild = function () {
    this.Cache.continents = this.countries.reduce(function (continents, country) {
        if (!continents[country.continent]) {
            continents[country.continent] = {
                countries: []
            }
        }

        continents[country.continent].countries.push(country.name);

        return continents;
    }, {});

    this.Cache.countries = this.cities.reduce(function (countries, city) {
        if (!countries[city.country]) {
            countries[city.country] = {
                cities: []
            }
        }

        countries[city.country].cities.push(city.name);

        return countries;
    }, {});

    this.Cache.cities = this.populations.reduce(function (cities, population) {
        cities[population.name] = population.count;

        return cities;
    }, {});
};

/**
 * Численность населения города
 *
 * @param city
 * @returns {*}
 */
populationIndex.prototype.getPopulationByCity = function (city) {
    return this.Cache.cities[city];
};

/**
 * Численность населения страны
 *
 * @param country
 * @returns {*}
 */
populationIndex.prototype.getPopulationByCountry = function (country) {
    if (!this.Cache.countries[country].count) {
        this.Cache.countries[country].count = this.Cache.countries[country].cities
            .reduce(function (count, city) {
                count += this.getPopulationByCity(city);

                return count;
            }.bind(this), 0);
    }

    return this.Cache.countries[country].count;
};

/**
 * Численность населения на континенте
 *
 * @param continent
 * @returns {*}
 */
populationIndex.prototype.getPopulationByContinent = function (continent) {

    if (!this.Cache.continents[continent].count) {
        var countriesInContinent = this.Cache.continents[continent].countries;

        this.Cache.continents[continent].count = countriesInContinent.reduce(function(count, country) {
            count += this.getPopulationByCountry(country);

            return count;
        }.bind(this), 0);
    }

    return this.Cache.continents[continent].count;
};

module.exports = populationIndex;