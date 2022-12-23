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
      <v-tabs background-color="#0062E0"  align-with-title>
        <v-tab class="menu-tab" href="/admin">Home</v-tab>
        <v-tab class="menu-tab" href="#test">Attendance</v-tab>
        <v-tab class="menu-tab" href="#chart">Chart</v-tab>
        <v-tab class="menu-tab" href="/student">Student</v-tab>
      </v-tabs>
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
.menu-tab{
  color: white !important;
}
</style>