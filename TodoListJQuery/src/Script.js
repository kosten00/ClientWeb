jQuery(function () {
    $('#add-item').click(function () {
        var inputTextField = $('.input-text-field');
        var inputFieldText = inputTextField.val().trim();

        var errorMessage = $('.error-message');

        if (inputFieldText === '') {
            errorMessage.addClass('error-message-show');
            inputTextField.val('');
            return
        }

        errorMessage.removeClass('error-message-show');

        inputTextField.val('');

        var listItem = $('<li></li>');
        listItem.addClass('items-in-list');

        listItem.append('<p class="list-item-text"></p>' +
            '<button class="todo-form-button edit-button">edit</button>' +
            '<button class="todo-form-button delete-button">delete</button>');

        listItem.children('p').text(inputFieldText);

        $('.list-of-items').append(listItem);

        $('.delete-button').click(function () {
            $(this).parent().remove();
        });

        $('.edit-button').click(function () {
            var textFieldText = $(this).prev().text().trim();

            $(this).parent().children().hide();

            $(this).parent().append('' +
                '<input type="text" class="edit-field" value="' + textFieldText + '"/>' +
                '<button class="todo-form-button save-button">save</button>' +
                '<button class="todo-form-button cancel-button">cancel</button>');

            $('.cancel-button').click(function () {
                $(this).parent().children().show();
                $(this).parent().children().remove('.edit-field').remove('.save-button').remove('.cancel-button');
            });

            $('.save-button').click(function () {
                var editFieldText = $(this).prev().val().trim();

                if (editFieldText === '') {
                    errorMessage.addClass('error-message-show');
                    $(this).prev().val('');
                    return;
                }

                errorMessage.removeClass('error-message-show');

                $(this).siblings('p').text(editFieldText);
                $(this).parent().children().show();
                $(this).parent().children().remove('.edit-field').remove('.save-button').remove('.cancel-button');
            })
        });
    })
});