jQuery(function () {
    $('.add-item').on('click', function () {
        let inputTextField = $('.input-text-field');
        let inputFieldText = inputTextField.val();

        function changeColor(color) {
            $('.error-message').css('color', color);
        }

        if (inputFieldText === "") {
            changeColor('#ff2020');

            return
        }
        changeColor('#fffdd9');

        inputTextField.val('');

        $('.list-of-items').append('' +
            '<li class="list-item">' +
            '<p class="list-item-text">' + inputFieldText + '</p>' +
            '<button class="edit-button">edit</button>' +
            '<button class="delete-button">delete</button>');

        $('.delete-button').on('click', function () {
            $(this).parent().remove();
        });

        $('.edit-button').on('click', function () {
            let textFieldText = $(this).prev().text();

            $(this).parent().children().hide();

            $(this).parent().append('' +
                '<input type="text" class="edit-field" value="' + textFieldText + '"/>' +
                '<button class="save-button">save</button>' +
                '<button class="cancel-button">cancel</button>')

            $('.cancel-button').on('click', function () {
                $(this).parent().children().show();
                $(this).parent().children().remove('.edit-field').remove('.save-button').remove('.cancel-button');
            });

            $('.save-button').on('click', function () {
                let editFieldText = $(this).prev().val();

                if (editFieldText === '') {
                    changeColor('#ff2020');

                    return;
                }

                $(this).siblings('p').text(editFieldText);
                $(this).parent().children().show();
                $(this).parent().children().remove('.edit-field').remove('.save-button').remove('.cancel-button');
            })
        });
    })
});