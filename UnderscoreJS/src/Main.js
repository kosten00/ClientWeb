var list = [{
    age: 20,
    name: 'Rodney',
    lastName: 'Quinn'
}, {
    age: 17,
    name: 'Walker',
    lastName: 'Eaton'
}, {
    age: 14,
    name: 'Devan',
    lastName: 'Macias'
}, {
    age: 41,
    name: 'Reese',
    lastName: 'Dean'
}, {
    age: 29,
    name: 'Paola',
    lastName: 'Cohen'
}, {
    age: 32,
    name: 'Aidyn',
    lastName: 'Finley'
}, {
    age: 26,
    name: 'Jonas',
    lastName: 'Atkins'
}, {
    age: 35,
    name: 'Courtney',
    lastName: 'Swanson'
}, {
    age: 38,
    name: 'Samir',
    lastName: 'Bowen'
}, {
    age: 23,
    name: 'Dayton',
    lastName: 'Clarke'
}];

var avgAge = _.reduce(list, function (memo, item) {
    return memo + item.age;
}, 0) / list.length;

console.log(avgAge);

var listOfAges = _.chain(list)
    .filter(function (item) {
        return item.age >= 20 && item.age <= 30;
    })
    .compact()
    .sortBy('age')
    .value();

console.log(listOfAges);

var listWithFullNames = _.each(list, function (item) {
    item.fullName = item.name + ' ' + item.lastName;
    return item;
});

console.log(listWithFullNames);
