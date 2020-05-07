<template>
  <nav>
    <v-app-bar app>
        <router-link text to="/">
          <span class="font-weight-light text-uppercase grey--text">
          todo</span>
          <span class="font-weight-black text-uppercase grey--text">list</span>
        </router-link>
      <v-spacer></v-spacer>
        <router-link text color="grey" to="/about">
          <span class="font-weight-light text-uppercase grey--text">
          about</span>
        </router-link>
    </v-app-bar>
  </nav>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
