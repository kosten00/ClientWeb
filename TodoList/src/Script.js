document.addEventListener('DOMContentLoaded', function () {
    var inputField = document.querySelector('.input-text-field');
    var addItemButton = document.querySelector('#add-item');
    var listOfItems = document.querySelector('.list-of-items');

    addItemButton.addEventListener('click', function () {
        var textFromTextField = inputField.value.trim();
        var errorMessage = document.querySelector('.error-message');

        if (textFromTextField === '') {
            errorMessage.classList.add('error-message-show');
            inputField.value = '';
            return;
        }

        var listItem = document.createElement('li');
        listItem.className = 'items-in-list';

        var textItem = document.createElement('p');
        textItem.className = 'list-item-text';
        textItem.textContent = textFromTextField;
        listItem.appendChild(textItem);

        var editButton = document.createElement('button');
        editButton.className = 'todo-form-button';
        editButton.textContent = 'edit';
        listItem.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.className = 'todo-form-button';
        deleteButton.textContent = 'delete';

        listItem.appendChild(deleteButton);

        listOfItems.appendChild(listItem);

        errorMessage.classList.remove('error-message-show');
        inputField.value = '';

        deleteButton.addEventListener('click', function () {
            listOfItems.removeChild(listItem);
        });

        editButton.addEventListener('click', function () {
            var editField = document.createElement('input');
            editField.type = 'text';
            editField.className = 'edit-field';
            editField.value = textFromTextField;

            textItem.parentNode.replaceChild(editField, textItem);

            var saveButton = document.createElement('button');
            saveButton.className = 'todo-form-button';
            saveButton.textContent = 'save';

            editButton.parentNode.replaceChild(saveButton, editButton);

            var cancelButton = document.createElement('button');
            cancelButton.className = 'todo-form-button';
            cancelButton.textContent = 'cancel';

            deleteButton.parentNode.replaceChild(cancelButton, deleteButton);

            saveButton.addEventListener('click', function () {
                var newTextValue = editField.value.trim();

                textFromTextField = newTextValue;

                if (newTextValue === '') {
                    errorMessage.classList.add('error-message-show');
                    editField.value = '';

                    return;
                }

                errorMessage.classList.remove('error-message-show');

                editField.parentNode.replaceChild(textItem, editField);
                textItem.textContent = newTextValue;

                saveButton.parentNode.replaceChild(editButton, saveButton);
                cancelButton.parentNode.replaceChild(deleteButton, cancelButton);
            });

            cancelButton.addEventListener('click', function () {
                editField.parentNode.replaceChild(textItem, editField);
                saveButton.parentNode.replaceChild(editButton, saveButton);
                cancelButton.parentNode.replaceChild(deleteButton, cancelButton);
            });
        })
    });
});