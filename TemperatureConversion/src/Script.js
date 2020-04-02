(function ready() {
    var inputField = document.querySelector(".text-field");
    var convertButton = document.querySelector(".convert-button");
    var outputFieldFahrenheit = document.querySelector(".fahrenheit-p");
    var outputFieldKelvin = document.querySelector(".kelvin-p");

    function convertToFahrenheit(value) {
        return (value * (9 / 5)) + 32;
    }

    function convertToKelvin(value) {
        return 273.15 + value;
    }

    convertButton.addEventListener("click", function () {
        var inputFieldValue = inputField.value;

        if (inputFieldValue === '') {
            alert('Please input value to the input field!');

            return;
        }

        var value = Number(inputFieldValue);

        outputFieldFahrenheit.textContent = convertToFahrenheit(value).toFixed(2);
        outputFieldKelvin.textContent = convertToKelvin(value).toFixed(2);
    });
})();