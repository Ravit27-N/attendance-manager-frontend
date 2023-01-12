<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      top
      right
      color="green accent-4"
      timeout="2000"
      rounded="pill"
      height="20"
    >
      {{Text}}
      <template v-slot:action="{ attrs }">
        <v-btn :color="color" text v-bind="attrs" @click="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: () => ({
   
  }),
   props: {
    Text: String,
    color: String,
  }
}
</script>