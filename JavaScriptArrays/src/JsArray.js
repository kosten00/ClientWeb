// Создайте массив чисел
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// Отсортируйте его по убыванию
array = array.sort(function (e1, e2) {
    return e2 - e1;
});
console.log(array);

// Получите подмассив из первых 5 элементов и
// подмассив из последних 5 элементов
let firstFiveElementsArray = array.slice(0, 5);
let lastFiveElementsArray = array.slice(array.length - 5);
console.log(firstFiveElementsArray);
console.log(lastFiveElementsArray);

// Найдите сумму элементов массива, которые являются
// четными числами
let sum = 0;
array.forEach(function (e) {
    if (e % 2 === 0) {
        sum+= e;
    }
});
console.log(sum);

// Создайте массив чисел от 1 до 100, в таком порядке
let start = 1;
let arrayToFill = [];
while (start <= 100) {
    arrayToFill.push(start++);
}
console.log(arrayToFill);

//Получите список квадратов четных чисел из этого
// массива
arrayToFill.forEach(function (e) {
    if (e % 2 === 0) {
        console.log(e * e);
    }
});