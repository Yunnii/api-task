var populationIndex = function (countries, cities, populations) {
    this.Cache = {
        cities: {},
        countries: {},
        continents: {}
    };

    this.countries = countries;
    this.cities = cities;
    this.populations = populations;
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
};

/**
 * Численность населения городов
 *
 * @private
 * @param cities
 * @returns {*}
 * @private
 */
populationIndex.prototype._getPopulationByCities = function (cities) {
    return this.populations.reduce(function(count, population) {
        if(cities.hasOwnProperty(population.name)) {
            count += population.count;
        }

        return count;
    }, 0);
};

/**
 * Численность населения города
 *
 * @param city
 * @returns {*}
 */
populationIndex.prototype.getPopulationByCity = function(city) {
    var query = {};
    query[city] = city;

    return this._getPopulationByCities(query);
};

/**
 * @private
 *
 * Численность населения списка стран
 *
 * @param countries
 * @returns {*}
 * @private
 */
populationIndex.prototype._getPopulationByCountries = function(countries) {
    var citiesInCountry = this.cities.reduce(function(res, city) {
        if(countries.hasOwnProperty(city.country)) {
            res[city.name] = city.name;
        }

        return res;
    }, {});

    return this._getPopulationByCities(citiesInCountry);
};

/**
 * Численность населения страны
 *
 * @param country
 * @returns {*}
 */
populationIndex.prototype.getPopulationByCountry = function(country) {
    var query = {};
    query[country] = country;

    return this._getPopulationByCountries(country);
};

/**
 * Численность населения на континенте
 *
 * @param continent
 * @returns {*}
 */
populationIndex.prototype.getPopulationByContinent = function(continent) {

    if (!this.Cache.continents[continent]) {
        var countriesInContinent = this.countries.reduce(function(res, country) {
            if (country.continent === continent) {
                res[country.name] = country.name;
            }

            return res;
        }, {});

        this.Cache.continents[continent] = {
            countries: countriesInContinent,
            count: this._getPopulationByCountries(countriesInContinent)
        };
    }

    return this.Cache.continents[continent].count;
};

module.exports = populationIndex;