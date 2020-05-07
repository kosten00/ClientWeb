// 1. Сейчас если в процессе редактирования заметки нажать Cancel, то сохраняется текущий текст заметки, а не тот, который был до начала редактирования
//
// 2. Сейчас элементы страницы не выровнены относительно друг друга.
// Лучше выровнять их:
// http://joxi.ru/nAyX3P8CjB6ak2
// Аналогично в диалоге редактирования
//
// 3. id не должен использоваться в качестве номера задачи.
// Для этой цели можно использовать index из v-for.
// И id не должны пересчитываться, они должны задаваться 1 раз при создании заметки
//
// 7. В диалоге редактирования лучше сделать кнопкам разный цвет
//
// 9. Вместо такого:
// @cancel="closeModal()"
// Лучше делать так:
// @cancel="closeModal"
//
// 10. currentTodo лучше изначально задать null вместо пустого объекта

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
                var that = this;

                setTimeout(function () {
                    that.isIncorrectInput = false;
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