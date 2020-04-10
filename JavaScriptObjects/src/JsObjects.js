(function () {
    var countries = [{
        name: 'Russia',
        cities: [{
            name: 'Novosibirsk',
            population: 1511000
        }, {
            name: 'Moscow',
            population: 11920000
        }, {
            name: 'Saint-Petersburg',
            population: 4991000
        }]
    }, {
        name: 'England',
        cities: [{
            name: 'London',
            population: 8900000
        }, {
            name: 'Manchester',
            population: 510746
        }, {
            name: 'Liverpool',
            population: 552267
        }]
    }, {
        name: 'Canada',
        cities: [{
            name: 'Toronto',
            population: 2930000
        }, {
            name: 'Montreal',
            population: 1780000
        }, {
            name: 'Vancouver',
            population: 675218
        }]
    }];

    // Найдите страну/страны с максимальным количеством городов
    function getMaxCitiesCountCountries(countries) {
        var maxCitiesCount = countries.reduce(function (maxCitiesCount, currentCountryCitiesCount) {
            return Math.max(currentCountryCitiesCount.cities.length, maxCitiesCount);
        }, 0);

        return countries.filter(function (country) {
            return country.cities.length === maxCitiesCount;
        });
    }

    console.log(getMaxCitiesCountCountries(countries));

    // Получите объект с информацией по всем странам такого вида: ключ – название страны, значение – суммарная численность по стране
    function getCountriesInfo(countries) {
        var countriesInfo = {};

        countries.forEach(function (country) {
            countriesInfo[country.name] = country.cities.reduce(function (countryPopulation, city) {
                return countryPopulation + city.population;
            }, 0);
        });

        return countriesInfo;
    }

    console.log(getCountriesInfo(countries));
})();