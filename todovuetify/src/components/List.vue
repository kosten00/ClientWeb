<template>
  <div class="list">
    <v-card class="mx-auto" max-width="750">
      <v-layout v-for="todo in todos" :key="todo.id" class="mx-auto">
        <span v-if="currentTodoId !== todo.id" class="mx-auto ma-auto text-truncate">
          {{ todo.todoText }}
        </span>
        <v-text-field dense v-else v-model="currentTodo.todoText"
                      :error-messages="hasNoText ? 'Input field is empty!' : undefined"
                      class="ma-2" hide-details="auto">
        </v-text-field>
        <v-btn @click="currentTodoId !== todo.id ? setCurrent(todo) : tryToSave(todo)" text>
          {{ currentTodoId === todo.id ? 'save' : 'edit' }}
        </v-btn>
        <v-btn @click="currentTodoId !== todo.id ? tryToRemove(todo) : cancel()" text>
          {{ currentTodoId === todo.id ? 'cancel' : 'remove' }}
        </v-btn>
      </v-layout>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Remove item?</v-card-title>
          <v-card-text>Do you want te remove todo: {{ currentTodo.todoText }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="yellow darken-4" text @click="cancel">Cancel</v-btn>
            <v-btn color="red darken-1" text @click="remove">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'ListItems',
    data: () => ({
      currentTodo: {
        todoText: '',
        id: null
      },
      dialog: false
    }),
    methods: {
      remove() {
        this.$store.commit('remove', this.currentTodo.id);
        this.dialog = false;
      },
      tryToSave(todo) {
        if (!this.hasNoText) {
          this.save(todo);
        }
      },
      tryToRemove(todo) {
        this.dialog = true;
        this.setCurrent(todo)
      },
      save(todo) {
        todo.todoText = this.currentTodo.todoText;
        this.$store.commit('update', todo);
        this.cancel();
      },
      setCurrent(todo) {
        this.currentTodo = {
          todoText: todo.todoText,
          id: todo.id
        };
      },
      cancel() {
        this.dialog = false
        this.currentTodo = {};
      }
    },
    computed: {
      todos() {
        return this.$store.state.todos;
      },
      hasNoText() {
        return this.currentTodo.todoText.trim().length === 0;
      },
      currentTodoId() {
        return this.dialog ? null : this.currentTodo.id;
      }
    }
  }
</script>
