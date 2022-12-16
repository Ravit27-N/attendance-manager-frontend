<template>
  <div class="container-page">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div class="row1 mt-7">
          <v-card
            class="mx-auto rounded-lg card-number"
            width="270"
            max-width="344"
            outlined
            color="#0062E0"
            align="center"
            justify-content="center">
            <v-list-item three-line>
              <img
                src="../assets/day-icon.png"
                align="center"
                class="ml-4"
                alt
                width="80"
              />

              <v-list-item-content>
                <v-list-item-title class="cardtitle text-h4 text-bold mb-1 mx-1 font-weight-bold">
                  <p class="text-h5 font-weight-bold">Today</p>115
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            class="mx-auto rounded-lg card-number"
            width="270"
            max-width="344"
            outlined
            color="#0062E0"
            align="center"
            justify-content="center">
            <v-list-item three-line>
              <img
                src="../assets/week-icon.png"
                align="center"
                class="ml-4"
                alt
                width="80"
              />

              <v-list-item-content>
                <v-list-item-title class="cardtitle text-h4 text-bold mb-1 mx-1 font-weight-bold">
                  <p class="text-h5 font-weight-bold">Week</p>115
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            class="mx-auto rounded-lg card-number"
            width="270"
            max-width="344"
            outlined
            color="#0062E0"
            align="center"
            justify-content="center">
            <v-list-item three-line>
              <img
                src="../assets/month-icon.png"
                align="center"
                class="ml-4"
                alt
                width="80"
              />

              <v-list-item-content>
                <v-list-item-title class="cardtitle text-h4 text-bold mb-1 mx-1 font-weight-bold">
                  <p class="text-h5 font-weight-bold">Month</p>115
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            class="mx-auto rounded-lg card-number"
            width="270"
            max-width="344"
            outlined
            color="#0062E0"
            align="center"
            justify-content="center">
            <v-list-item three-line>
              <img
                src="../assets/year-icon.png"
                align="center"
                class="ml-4"
                alt
                width="80"
              />

              <v-list-item-content>
                <v-list-item-title class="cardtitle text-h4 text-bold mb-1 mx-1 font-weight-bold">
                  <p class="text-h5 font-weight-bold">Year</p>115
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
        <div class="test"></div>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped>
.test {
  background-color: red;
}
.row1 {
  width: 100%;
  display: flex;
  justify-content: center;
}
.cardtitle {
  color: white;
  font-family: "Times New Roman", Times, serif;
}
</style>