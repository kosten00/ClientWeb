<template>
  <div class="ma-2">
    <v-text-field v-model="todoText" :error-messages="hasNoText ? 'Input field is empty!' : undefined"
                  class="ma-2" label="Input your Todo text here" hide-details="auto">
      <v-btn @click="clear" slot="append" text>
        clear
      </v-btn>
      <v-btn @click="isCorrectInput() ? add() : setError()" slot="append" text>
        add
      </v-btn>
    </v-text-field>
  </div>
</template>

<script>
  import store from '../store/index'

  export default {
    name: 'List',
    data: () => ({
      todoText: '',
      hasError: false
    }),
    methods: {
      add() {
        store.commit('add', this.todoText);
        this.todoText = '';
        this.hasError = false;
      },
      clear() {
        this.hasError = false;
        this.todoText = '';
      },
      isCorrectInput() {
        return this.todoText.trim() !== '';
      },
      setError() {
        this.hasError = true;
        this.todoText = '';
      }
    },
    computed: {
      hasNoText() {
        return this.hasError && this.todoText.trim().length === 0;
      }
    }
  }
</script>
