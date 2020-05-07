new Vue({
    el: '#app',
    data: {
        id: 0,
        todoText: '',
        todos: [],
        isIncorrectInput: false,
        isRemoving: false,
        isEditing: false,
        currentTodo: null,
        editFieldText: '',
    },
    methods: {
        add: function () {
            this.todos.push({
                text: this.todoText.trim(),
                id: this.id
            });

            this.id++;
            this.todoText = '';
        },
        remove: function () {
            var todoToRemove = this.currentTodo;

            this.todos = this.todos.filter(function (todo) {
                return todo !== todoToRemove;
            });
        },
        setCurrent: function (todo, event) {
            event.currentTarget.id === 'remove'
                ? this.isRemoving = true
                : this.isEditing = true;

            this.currentTodo = todo;

            if (this.isEditing) {
                this.isRemoving = false;

                this.editFieldText = this.currentTodo.text;

                return;
            }

            this.isEditing = false;
        },
        isCorrectInput: function (inputText) {
            if (inputText.trim() === '') {
                this.isIncorrectInput = true;
                var self = this;

                setTimeout(function () {
                    self.isIncorrectInput = false;
                }, 2000);

                return false;
            }

            this.isIncorrectInput = false;

            return true;
        },
        closeAndSave: function () {
            this.currentTodo.text = this.editFieldText;
            this.isEditing = false;
        },
        closeAndCancel: function () {
            this.isRemoving = false;
            this.isEditing = false;
        }
    }
});
