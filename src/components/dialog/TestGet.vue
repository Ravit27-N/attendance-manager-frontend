<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>
      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="submit">Submit</v-btn>
        <v-btn color="red darken-1" flat @click.native="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("update:dialog", false);
     this.$emit('close-dialog'); 
    },
    submit() {
      alert("Submit");
      this.$emit("update:dialog", false);
    }
    
  }
};
</script>
