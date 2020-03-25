function ready() {
    let inputField = document.querySelector(".text-field");
    let convertButton = document.querySelector(".convert-button");
    let outputFieldFahrenheit = document.querySelector(".fahrenheit-p");
    let outputFieldKelvin = document.querySelector(".kelvin-p");

    convertButton.addEventListener("click", function () {
        let value = Number(inputField.value);
        outputFieldFahrenheit.textContent = (value * (9 / 5)) + 32;
        outputFieldKelvin.textContent = 273.15 + value;
    });
}

document.addEventListener("DOMContentLoaded", ready);