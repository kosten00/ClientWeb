function ready() {
    var inputField = document.querySelector(".input-text-field");
    var addItemButton = document.querySelector(".add-item");
    var listOfItems = document.querySelector(".list-of-items");

    addItemButton.addEventListener("click", function () {
        var textFromTextfield = inputField.value;
        var errorMessage = document.querySelector(".error-message");

        if (textFromTextfield === "") {
            errorMessage.style.color = "#ff2020";

            return;
        }
        var listItem = document.createElement("li");
        listItem.className = "items-in-list";

        var stringItem = document.createElement("p");
        stringItem.className = "list-item-text";
        stringItem.textContent = textFromTextfield;
        listItem.appendChild(stringItem);

        var editButton = document.createElement("button");
        editButton.textContent = "edit";
        listItem.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        listItem.appendChild(deleteButton);

        listOfItems.appendChild(listItem);

        errorMessage.style.color = "#fffdd9";
        inputField.value = "";

        deleteButton.addEventListener("click", function () {
            listOfItems.removeChild(listItem);
        });

        editButton.addEventListener("click", function () {
            var editField = document.createElement('input');
            editField.type = 'text';
            editField.className = "edit-field";

            stringItem.replaceWith(editField);
            editField.value = textFromTextfield;

            var saveButton = document.createElement("button");
            saveButton.textContent = "save";
            editButton.replaceWith(saveButton);

            var cancelButton = document.createElement("button");
            cancelButton.textContent = "cancel";
            deleteButton.replaceWith(cancelButton);

            saveButton.addEventListener("click", function () {
                var newStringValue = editField.value;

                if (newStringValue === "") {
                    errorMessage.style.color = "#ff2020";

                    return;
                }
                editField.replaceWith(stringItem);
                stringItem.textContent = newStringValue;

                saveButton.replaceWith(editButton);
                cancelButton.replaceWith(deleteButton);
            });

            cancelButton.addEventListener("click", function () {
                editField.replaceWith(stringItem);

                saveButton.replaceWith(editButton);
                cancelButton.replaceWith(deleteButton);
            });
        })
    });
}

document.addEventListener("DOMContentLoaded", ready);