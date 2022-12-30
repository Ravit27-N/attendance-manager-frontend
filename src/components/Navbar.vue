<template>
  <v-app-bar app color="#0062E0" dark>
    <div class="d-flex align-center">
      <a href="/admin">
        <v-img
          alt="Vuetify Logo"
          class="shrink ml-5"
          contain
          src="../assets/Stemlogo.png"
          transition="scale-transition"
          width="60"
        />
      </a>
      <h3 class="mx-2">
        STEM
        <br />Library
      </h3>
    </div>
    <div class="ml-5">
      <div id="nav">
        <router-link class="menu" :active="active" to="/admin">Home</router-link>
        <router-link class="menu" :active="active" to="/student">Student</router-link>
        <router-link class="menu" :active="active" to="/report">Report</router-link>
        <router-link class="menu" :active="active" to="/chart">Chart</router-link>
      </div>
    </div>
    <v-spacer></v-spacer>
    <v-btn tile color="error">
      Log out
      <v-icon right>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<style scoped>
.active {
  background-color: indianred;
  color: red;
}
.menu-tab {
  color: white !important;
}
.menu {
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  padding-bottom: 1rem;
  margin-left: 2rem;
}
.menu:hover {
  font-weight: 300;
}
a.router-link-active {
  font-weight: 400;
  border-bottom: 3px solid;
}
</style>