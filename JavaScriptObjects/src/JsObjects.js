let countries = [{
    name: 'Russia', cities: [
        {name: 'Novosibirsk', population: 1511000},
        {name: 'Moscow', population: 11920000},
        {name: 'Saint-Petersburg', population: 4991000}]
}, {
    name: 'England', cities: [
        {name: 'London', population: 8900000},
        {name: 'Manchester', population: 510746},
        {name: 'Liverpool', population: 552267}]
}, {
    name: 'Canada', cities: [
        {name: 'Toronto', population: 2930000},
        {name: 'Montreal', population: 1780000},
        {name: 'Vancouver', population: 675218},]
}];

// Найдите страну/страны с максимальным количеством
// городов
let maxCitiesCount = 0;

countries.forEach(function (e) {
    let currentCitiesCount = e.cities.length;
    maxCitiesCount = currentCitiesCount < maxCitiesCount ? maxCitiesCount : currentCitiesCount;
});

console.log(maxCitiesCount);

// Получите объект с информацией по всем странам такого
// вида: ключ – название страны, значение – суммарная
// численность по стране
let countriesInfo = {};

countries.forEach(function (e) {
    let count = 0;
    e.cities.forEach(function (city) {
        count += city.population;
    });

    countriesInfo[e.name] = count;
});

console.log(countriesInfo);