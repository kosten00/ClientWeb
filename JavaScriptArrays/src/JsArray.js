(function ready() {
// Создайте массив чисел
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// Отсортируйте его по убыванию
    array.sort(function (e1, e2) {
        return e2 - e1;
    });
    console.log(array);

// Получите подмассив из первых 5 элементов и подмассив из последних 5 элементов
    var firstFiveElementsArray = array.slice(0, 5);
    var lastFiveElementsArray = array.slice(array.length - 5);

    console.log(firstFiveElementsArray);
    console.log(lastFiveElementsArray);

// Найдите сумму элементов массива, которые являются четными числами
    var evenSum = array
        .filter(function (value) {
            return value % 2 === 0 ? value : 0;
        })
        .reduce(function (sum, evenValue) {
            return sum + evenValue;
        });
    console.log(evenSum);

// Создайте массив чисел от 1 до 100, в таком порядке
    var arrayToFill = [];

    for (var i = 1; i <= 100; i++) {
        arrayToFill.push(i);
    }
    console.log(arrayToFill);

//Получите список квадратов четных чисел из этого массива
    var newArray = arrayToFill
        .filter(function (value) {
            return value % 2 === 0;
        })
        .map(function (filteredValue) {
            return filteredValue * filteredValue;
        });

    console.log(newArray);
})();
