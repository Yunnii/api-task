var populationIndex = function (countries, cities, populations) {
    this.update(countries, cities, populations);
};

populationIndex.prototype.update = function (countries, cities, populations) {
    this.cache = {
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
    this.cache.continents = this.countries.reduce(function (continents, country) {
        var continent = country.continent;

        if (!continents[continent]) {
            continents[continent] = {
                countries: []
            }
        }

        continents[continent].countries.push(country.name);

        return continents;
    }, {});

    this.cache.countries = this.cities.reduce(function (countries, city) {
        var country = city.country;

        if (!countries[country]) {
            countries[country] = {
                cities: []
            }
        }

        countries[country].cities.push(city.name);

        return countries;
    }, {});

    this.cache.cities = this.populations.reduce(function (cities, population) {
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
    return this.cache.cities[city];
};

/**
 * Численность населения страны
 *
 * @param country
 * @returns {*}
 */
populationIndex.prototype.getPopulationByCountry = function (country) {
    if (!this.cache.countries[country].count) {
        this.cache.countries[country].count = this.cache.countries[country].cities
            .reduce(function (count, city) {
                count += this.getPopulationByCity(city);

                return count;
            }.bind(this), 0);
    }

    return this.cache.countries[country].count;
};

/**
 * Численность населения на континенте
 *
 * @param continent
 * @returns {*}
 */
populationIndex.prototype.getPopulationByContinent = function (continent) {

    if (!this.cache.continents[continent].count) {
        var countriesInContinent = this.cache.continents[continent].countries;

        this.cache.continents[continent].count = countriesInContinent.reduce(function(count, country) {
            count += this.getPopulationByCountry(country);

            return count;
        }.bind(this), 0);
    }

    return this.cache.continents[continent].count;
};

module.exports = populationIndex;