import $ from 'jquery';

export function PhoneBookService() {
    this.getContacts = function (term) {
        return $.get('/getContacts?term=' + term);
    }

    this.addContact = function (contact) {
        return $.post({
            url: '/addContact',
            contentType: 'application/json',
            data: JSON.stringify({request: contact})
        });
    }

    this.removeContacts = function (IDs) {
        return $.post({
            url: '/removeContacts',
            contentType: 'application/json',
            data: JSON.stringify({request: IDs})
        });
    }
}
