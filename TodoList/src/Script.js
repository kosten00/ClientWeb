function ready() {
    let inputField = document.querySelector(".input-text-field");
    let addItemButton = document.querySelector(".add-item");
    let listOfItems = document.querySelector(".list-of-items");
    
    addItemButton.addEventListener("click", function () {
        let textFromTextfield = inputField.value;
        let errorMessage = document.querySelector(".error-message");

        if (textFromTextfield === "") {
            errorMessage.style.color = "#ff2020";

            return;
        }
        let listItem = document.createElement("li");
        listItem.className = "items-in-list";

        let stringItem = document.createElement("p");
        stringItem.className = "list-item-text";
        stringItem.textContent = textFromTextfield;
        listItem.appendChild(stringItem);

        let editButton = document.createElement("button");
        editButton.textContent = "edit";
        listItem.appendChild(editButton);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        listItem.appendChild(deleteButton);

        listOfItems.appendChild(listItem);

        errorMessage.style.color = "#fffdd9";
        inputField.value = "";

        deleteButton.addEventListener("click", function () {
            listOfItems.removeChild(listItem);
        });

        editButton.addEventListener("click", function () {
            let editField = document.createElement('input');
            editField.type = 'text';
            editField.className = "edit-field";

            stringItem.replaceWith(editField);
            editField.value = textFromTextfield;

            let saveButton = document.createElement("button");
            saveButton.textContent = "save";
            editButton.replaceWith(saveButton);

            let cancelButton = document.createElement("button");
            cancelButton.textContent = "cancel";
            deleteButton.replaceWith(cancelButton);

            saveButton.addEventListener("click", function () {
                let newStringValue = editField.value;

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