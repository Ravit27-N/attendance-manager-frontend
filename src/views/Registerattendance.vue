<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="12">
            <div class="row1">
              <img src="../assets/Stemlogo.png" width="75" height="75" alt />
              <div class="space"></div>
              <img src="../assets/user-2.png" width="75" height="75" alt />
            </div>
            <div class="row2">
              <div class="welcome">
                <h1 class="english-welcome" v-if="ishidden">
                  Welcome to STEM library of
                  <br />Institute of Technology of Cambodia
                </h1>
                <h1 class="khmer-welcome" v-if="!ishidden">
                  សូមស្វាគមន៍មកកាន់ STEM library នៃ
                  <br />វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា
                </h1>
              </div>
            </div>
            <div class="row3">Input</div>
            <div class="row4">card</div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    ishidden:true
  }),
  methods:{
    animationwelcome(){
      setInterval(() => {
        this.ishidden = !this.ishidden;
      }, 500);
    }
  },
  mounted(){
    this.animationwelcome();
  }
}
</script>
<style scoped>
.row1 {
  display: flex;
  justify-content: center;
  background-color: red;
}
.row1 .space {
  width: 80%;
}
.row2 {
  justify-content: center;
  text-align: center;
}
.row2 .welcome h1 {
  font-size: 3rem;
}
 
</style>