<template>
    <div class="container" v-cloak id="app">
        <h1 class="p-2">PhoneBook</h1>
        <hr>
        <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>First name<span v-if="isEmptyFirstName"
                                           class="badge badge-danger">Field is empty</span></label>
                    <input v-model="firstName" @input="isEmptyFirstName = false" type="text" class="form-control">
                </div>
                <div class="form-group col-md-6">
                    <label>Last name<span v-if="isEmptyLastName"
                                          class="badge badge-danger">Field is empty</span></label>
                    <input v-model="lastName" @input="isEmptyLastName = false" type="text" class="form-control">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Phone number<span v-if="isEmptyPhone"
                                             class="badge badge-danger">Field is empty</span></label>
                    <input v-model="phone" @input="isEmptyPhone = false" type="number" class="form-control">
                </div>
                <div class="form-group col-md-6">
                    <label>Please input contact data and press "Add" button</label>
                    <div class="form-row">
                        <button @click.prevent="add" class="btn form-group btn-primary offset-md-1 col-md-5">Add
                        </button>
                        <button @click.prevent="clearInputs"
                                class="btn form-group btn-secondary offset-md-1 col-md-5"
                                :disabled="hasNoFilledFields">Clear
                        </button>
                    </div>
                </div>
            </div>
            <div class="form-row ">
                <input v-model="term" type="text" class="form-control form-group col-md-8" :disabled="hasEmptyContacts">
                <button @click.prevent="getContacts" class="btn form-group btn-primary offset-md-1 col-md-3"
                        :disabled="isEmptyTerm || hasEmptyContacts">{{ searchButtonText }}
                </button>
            </div>
        </form>
        <table class="table fixed-layout-table">
            <thead class="thead-light">
            <tr>
                <th>
                    <input type="checkbox" v-model="selectAll" class="position-relative" :disabled="hasEmptyContacts">
                </th>
                <th>#</th>
                <th class="w-20">First</th>
                <th class="w-20">Last</th>
                <th class="w-25">Phone</th>
                <th class="w-15">
                    <button @click.prevent="openConfirmationModal()" :disabled="hasNoCheckedContacts"
                            class="btn p-0 btn-danger"
                            type="button">
                        Remove selected
                    </button>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr :key="contact.id" v-for="(contact, index) in contacts">
                <td>
                    <input type="checkbox" v-model="checkedContactsIDs" :value="contact.id"
                           class="position-relative">
                </td>
                <td>{{ index + 1 }}</td>
                <td class="text-truncate">{{ contact.firstName }}</td>
                <td class="text-truncate">{{ contact.lastName }}</td>
                <td class="text-truncate">{{ contact.phone }}</td>
                <td class="align-content-center">
                    <button @click.prevent="openConfirmationModal(contact)"
                            class="btn p-0 btn-danger" type="button">
                        Remove
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
        <b-modal id="confirmation-modal"
                 @ok="remove()"
                 ok-variant="danger"> {{ modalText }}
        </b-modal>
    </div>
</template>

<script>
    import {PhoneBookService} from './PhoneBookService';

    export default {
        data() {
            return {
                service: new PhoneBookService(),
                contacts: [],
                firstName: '',
                lastName: '',
                phone: '',
                isEmptyFirstName: false,
                isEmptyLastName: false,
                isEmptyPhone: false,
                term: '',
                checkedContactsIDs: [],
                currentContact: null,
                modalText: '',
                hasSearchFilterApplied: false,
                searchButtonText: 'Search'
            };
        },
        created: function () {
            this.getContacts();
        },
        methods: {
            getContacts() {
                if (this.hasSearchFilterApplied) {
                    this.hasSearchFilterApplied = false;

                    this.searchButtonText = 'Search';

                    this.term = '';
                }

                if (this.term.length > 0 && !this.hasSearchFilterApplied) {
                    this.hasSearchFilterApplied = true;

                    this.searchButtonText = 'Disable search filter';
                }

                this.service.getContacts(this.term).done(contacts => this.contacts = contacts)
            },
            add() {
                if (this.hasEmptyFields()) {
                    return;
                }

                this.service.addContact({firstName: this.firstName, lastName: this.lastName, phone: this.phone});

                this.clearInputs();

                this.getContacts();
            },
            remove() {
                let IDs = [];

                if (this.checkedContactsIDs.length > 0) {
                    IDs = this.checkedContactsIDs;
                } else {
                    IDs.push(this.currentContact.id);

                    this.currentContact = null;
                }

                for (let i = 0; i < IDs.length; i++) {
                    this.checkedContactsIDs = this.checkedContactsIDs.filter(contactId => contactId !== IDs[i])
                }

                this.service.removeContacts({IDs: IDs});

                this.getContacts();
            },
            clearInputs() {
                this.firstName = '';
                this.lastName = '';
                this.phone = '';
                this.term = '';
            },
            hasEmptyFields() {
                if (this.firstName.trim() === '') {
                    this.isEmptyFirstName = true;
                }

                if (this.lastName.trim() === '') {
                    this.isEmptyLastName = true;
                }

                if (this.phone.trim() === '') {
                    this.isEmptyPhone = true;
                }

                return this.isEmptyFirstName || this.isEmptyLastName || this.isEmptyPhone;
            },
            openConfirmationModal(contact) {
                if (contact !== undefined) {
                    this.currentContact = contact;

                    const {firstName, lastName, phone} = this.currentContact;

                    this.modalText = `Remove contact: ${firstName} ${lastName} ${phone}?`;
                } else {
                    this.modalText = 'Remove all selected contacts?';
                }

                this.$bvModal.show('confirmation-modal');
            }
        },
        computed: {
            hasNoFilledFields() {
                return this.firstName === '' && this.lastName === '' && this.phone === '';
            },
            isEmptyTerm() {
                return this.term.trim() === '';
            },
            hasEmptyContacts() {
                return this.contacts.length === 0;
            },
            selectAll: {
                get() {
                    if (this.contacts !== undefined) {
                        return this.checkedContactsIDs.length === this.contacts.length;
                    } else {
                        return false;
                    }
                },
                set(value) {
                    if (this.checkedContactsIDs.length === this.contacts.length) {
                        this.checkedContactsIDs = [];

                        return;
                    }

                    let checked = [];

                    if (value !== undefined) {
                        this.contacts.forEach(contact => checked.push(contact.id))
                    }

                    this.checkedContactsIDs = checked;
                }
            },
            hasNoCheckedContacts() {
                return this.checkedContactsIDs.length === 0;
            }
        }
    }
</script>

<style lang="scss">
    $background-color: #ffffff;

    * {
        background: $background-color;
    }

    [v-cloak] {
        display: none;
    }

    .fixed-layout-table {
        table-layout: fixed;
    }
</style>