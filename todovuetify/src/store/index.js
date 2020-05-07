import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    id: 0
  },
  mutations: {
    add(state, todoText) {
      state.todos.push({
        todoText,
        id: state.id
      });

      state.id++;
    },
    remove(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    update(state, editedTodo) {
      const index = state.todos.findIndex(todo => todo.id === editedTodo.id);

      state.todos[index].todoText = editedTodo.todoText;
    }
  }
});
