<template>
  <div>
    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card class="pa-5">
        <v-list-item three-line>
          <v-list-item-avatar tile size="200px">
            <v-img src="@/assets/e20180328.jpg" width="200px"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="text-overline mb-4">Candidate information</div>
            <!-- <v-list-item-avatar size="100">
            <v-img src="@/assets/logoitc.png"></v-img>
            </v-list-item-avatar>-->
            <v-list-item-title class="name">
              Hun Ravit
              <br />
              <span class="usertype">Ingénieure</span>
            </v-list-item-title>
          </v-list-item-content>
          <br>  <v-avatar size="100">
              <img src="@/assets/logoitc.png" alt="logoitc" />
            </v-avatar>
        </v-list-item>
        <v-list-item-content>
          <!-- <v-list-item-title class="information">Id: e20180328</v-list-item-title>
          <v-list-item-title class="information">Phone: 0882223414</v-list-item-title>
          <v-list-item-title class="information">Option: I5-GIC</v-list-item-title>-->
        </v-list-item-content>
        <div class="coninfo">
          <v-chip class="ma-2 information" color="primary" label>
            <v-icon left>mdi-account</v-icon>e20180328
          </v-chip>
          <v-chip class="ma-2 information" color="primary" label>
            <v-icon left>mdi-phone</v-icon>0882223414
          </v-chip>
          <v-chip class="ma-2 information" color="primary" label>
            <v-icon left>mdi-information</v-icon>I5-GIC
          </v-chip>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-icon medium color="red" @click="readuser(item)" @click.stop="dialogDelete = true">mdi-delete</v-icon>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialogDelete: false
  }),
  methods: {
    readuser() {
      console.log("test");
    }
  }
};
</script>
<style scoped>
.name {
  font-size: 2rem;
  font-weight: bold;
}
.usertype {
  font-size: 1.3rem;
  font-weight: 600;
}
.coninfo {
  display: flex;
  flex-direction: row;
}
.information {
  width: 30%;
  text-align: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 500;
}
</style>