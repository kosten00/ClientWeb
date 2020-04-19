new Vue({
    el: '#app',
    data: {
        id: 1,
        todoText: '',
        todos: [],
        isIncorrectInput: false,
        isRemoving: false,
        isEditing: false,
        currentTodo: {},
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
            var currentTodoId = this.currentTodo.id;
            var todoToRemove = this.currentTodo;

            this.todos = this.todos.filter(function (todo) {
                return todo !== todoToRemove;
            });

            var filteredTodosLength = this.todos.length;
            this.id = filteredTodosLength + 1;

            if (currentTodoId !== filteredTodosLength + 1) {
                for (var i = currentTodoId - 1; i < filteredTodosLength; i++) {
                    this.todos[i].id = i + 1;
                }
            }
        },
        setCurrent: function (todo) {
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
                var that = this;

                setTimeout(function () {
                    that.incorrectInput = false;
                }, 2000);

                return false;
            }

            this.isIncorrectInput = false;

            return true;
        },
        closeModal: function () {
            if (this.isEditing) {
                this.currentTodo.text = this.editFieldText;
                this.isEditing = false;
                return;
            }

            this.isRemoving = false;
        },
    }
});