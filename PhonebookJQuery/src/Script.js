$(function () {
    var filterBlock = $('.filter');
    filterBlock.hide();

    var surnameField = $('#surname-input');
    var nameField = $('#name-input');
    var phoneField = $('#phone-input');
    var selectAllCheckbox = $('#select-all-checkbox');
    var filterInputField = $('#filter-field');

    var addNewItemButton = $('#add-new-item-button');
    var applyFilterButton = $('#apply-filter-button');
    var cancelFilterButton = $('#cancel-filter-button');

    var phones = [];

    selectAllCheckbox.click(function () {
        if ($(this).is(':checked')) {
            $('.list-item-checkbox').prop('checked', true).siblings('.remove-button').text('remove all selected');
        } else {
            $('.list-item-checkbox').prop('checked', false).siblings('.remove-button').text('remove');
        }
    });

    addNewItemButton.click(function () {
        var itemIndex = getListLength() + 1;

        var surname = surnameField.val();
        var name = nameField.val();
        var phone = phoneField.val();

        var emptyFields = [];

        if (surname === '') {
            surnameField.parent().addClass('red-background');
            emptyFields.push('surname');
        }

        if (name === '') {
            nameField.parent().addClass('red-background');
            emptyFields.push('name');
        }

        if (phone === '') {
            phoneField.parent().addClass('red-background');
            emptyFields.push('phone');
        }

        var incorrectInputInformer = $('#incorrect-input-informer');

        if (emptyFields.length !== 0) {
            incorrectInputInformer.text('Fields ' + emptyFields.join(', ') + ' were not filled!').addClass('red-background');

            return;
        }

        incorrectInputInformer.text('Please input surname, name, phone number and press + button');
        $('.red-background').removeClass('red-background');

        if (phones.indexOf(phone) === -1) {
            phones.push(phone);

            addEntry(itemIndex, surname, name, phone);
        } else {
            $('<div></div>').appendTo('body')
                .html('<div><h6>Do you want to add contact with phone number, that is already in phone-book?</h6></div>')
                .dialog({
                    modal: true,
                    title: 'Please validate',
                    zIndex: 10000,
                    autoOpen: true,
                    width: 'auto',
                    resizable: false,
                    buttons: {
                        Yes: function () {
                            addEntry(itemIndex, surname, name, phone);
                            $(this).dialog('close');
                        },
                        No: function () {
                            clearInputFields();
                            $(this).dialog('close');
                        }
                    },
                    close: function () {
                        $(this).remove();
                    }
                });
        }
    });

    applyFilterButton.click(function () {
        var filterText = filterInputField.val().toLowerCase();

        if (filterText === '') {
            return;
        }

        var listItems = $('.list-item');
        listItems.hide();

        listItems.each(function () {
            if ($(this).children('.surname').text().toLowerCase().indexOf(filterText) !== -1 ||
                $(this).children('.name').text().toLowerCase().indexOf(filterText) !== -1 ||
                $(this).children('.phone').text().toLowerCase().indexOf(filterText) !== -1) {
                $(this).show();
            }
        });
    });

    cancelFilterButton.click(function () {
        filterInputField.val('');

        $('.list-item').show();
    });

    function addEntry(itemIndex, surname, name, phone) {
        var list = $('#list');

        var listItem = $('<li class="list-item"></li>');
        var listItemCheckbox = $('<input type="checkbox" class="list-item-checkbox"/>');
        var listItemIndex = $('<p class="list-item-text-info index"></p>');
        var listItemSurname = $('<p class="list-item-text-info surname"></p>');
        var listItemName = $('<p class="list-item-text-info name"></p>');
        var listItemPhone = $('<p class="list-item-text-info phone"></p>');
        var listItemRemoveButton = $('<a href="#" class="form-buttons remove-button">remove</a>');

        list.append(
            listItem
                .append(listItemCheckbox
                    .click(function () {
                        selectAllCheckbox.prop('checked', false);

                        if ($(this).is(':checked')) {
                            listItemRemoveButton.text('remove all selected');
                        } else {
                            listItemRemoveButton.text('remove');
                        }
                    }))
                .append(listItemIndex.text(itemIndex))
                .append(listItemSurname.text(surname))
                .append(listItemName.text(name))
                .append(listItemPhone.text(phone))
                .append(listItemRemoveButton
                    .click(function () {
                        var buttonsToRemove = [];

                        if (listItemRemoveButton.text() !== 'remove all selected') {
                            buttonsToRemove.push(listItemRemoveButton);
                        } else {
                            $('.list-item-checkbox:checked').each(function () {
                                buttonsToRemove.push($(this).siblings('.remove-button'));
                            });
                        }

                        $('<div></div>').appendTo('body')
                            .html('<div><h6>Remove item?</h6></div>')
                            .dialog({
                                modal: true,
                                title: 'Please validate',
                                zIndex: 10000,
                                autoOpen: true,
                                width: '300px',
                                resizable: false,
                                buttons: {
                                    Yes: function () {
                                        buttonsToRemove.forEach(function (button) {
                                            removeEntry(button, button.siblings('.phone').text());
                                        })
                                        $(this).dialog('close');
                                    },
                                    No: function () {
                                        $(this).dialog('close');
                                    }
                                },
                                close: function () {
                                    $(this).remove();
                                }
                            }).css('font-size', '1.2em');
                    }))
        );
        clearInputFields();

        changeFilterFieldStatus();
    }

    function changeFilterFieldStatus() {
        if (getListLength() >= 2) {
            filterBlock.show();
        } else {
            filterBlock.hide();
            selectAllCheckbox.prop('checked', false);
        }
    }

    function removeEntry(button, phone) {
        phones.splice(phones.indexOf(phone));

        button.parent().remove();

        recountIndexes();

        changeFilterFieldStatus();
    }

    function clearInputFields() {
        surnameField.val('');
        nameField.val('');
        phoneField.val('');
    }

    function getListLength() {
        return $('li').length;
    }

    function recountIndexes() {
        $('.index').each(function (index) {
            $(this).text(index + 1);
        })
    }
});