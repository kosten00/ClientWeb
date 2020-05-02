const express = require('express');
const router = express.Router();

let contacts = [];
let newId = 1;

router.get('/getContacts', function (req, res) {
    const term = (req.query.term || '').toUpperCase();

    const filteredContacts = term.length === 0
        ? contacts
        : contacts.filter(function (c) {
            return c.firstName.toUpperCase().indexOf(term) >= 0
                || c.lastName.toUpperCase().indexOf(term) >= 0
                || c.phone.toUpperCase().indexOf(term) >= 0;
        });

    res.send(filteredContacts);
});

router.post('/removeContacts', function (req, res) {
    const IDs = req.body.request.IDs;

    for (let i = 0; i < IDs.length; i++) {
        let contactToRemove = contacts.find(contact => contact.id === IDs[i]);

        if (contactToRemove === undefined) {
            res.send({
                success: false,
                message: `Contact with id: '${IDs[i]}' was not found`
            });

            return;
        }

        contacts = contacts.filter(contact => contact.id !== contactToRemove.id);
    }

    res.send({
        success: true,
        message: null
    });
});

router.post('/addContact', function (req, res) {
    const contactToAdd = req.body.request;

    const hasContactWithSamePhone = contacts.some(contact => contact.phone.toUpperCase() === contactToAdd.phone.toUpperCase());

    if (hasContactWithSamePhone) {
        res.send({
            success: false,
            message: 'Contact with this phone already exists!'
        });

        return;
    }

    contactToAdd.id = newId;
    newId++;

    contacts.push(contactToAdd);

    res.send({
            success: true,
            message: null
        }
    );
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;