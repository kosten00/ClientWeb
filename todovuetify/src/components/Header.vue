<template>
  <nav>
    <v-app-bar app>
      <v-btn text>
        <router-link tag="div" to="/">
          <span class="font-weight-light text-uppercase grey--text">
          todo</span>
          <span class="font-weight-black text-uppercase grey--text">list</span>
        </router-link>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="grey">
        <router-link tag="span" to="/about">
          about
        </router-link>
      </v-btn>
    </v-app-bar>
  </nav>
</template>
