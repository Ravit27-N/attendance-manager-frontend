<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center">
          <v-col cols="12" sm="12" md="12">
            <div class="row1">
              <a href="/#"><img src="../assets/Stemlogo.png" width="75" height="75" alt /></a>
              <div class="space"></div>
              <a href="/#"><img src="../assets/user-2.png" width="75" height="75" alt /></a>
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
            <div class="row3">
              <div class="input-box">
                <v-row class="pt-7">
                  <v-text-field
                    class="mr-2"
                    solo
                    placeholder="Please enter your student's id"
                    outlined
                    clearable
                  ></v-text-field>
                  <v-btn class="btn-submit " dark x-large color="blue">SUBMIT</v-btn>
                </v-row>
                <p class="example-id">Example: e20180328</p>
              </div>
            </div>
            <div class="row4 mb-3">
              <v-row class="pt-5 justify-center">
                <div v-for="item in lastfivestudent" :key="item.id">
                  <v-card class="mx-5 student-card" max-width="300">
                    <div class="logoschool mt-3" align="center">
                      <img src="../assets/logoitc.png" alt width="45" />
                    </div>
                    <div class="department mb-2" align="center">
                      <h4>GIC</h4>
                    </div>

                    <div class="logoschool mb-2 px-12" align="center">
                      <img src="../assets/e20180328.jpg" alt height="150" />
                    </div>

                    <div class="student-name mb-3" align="center">
                      <h3>{{item.name}}</h3>
                      <h4>{{item.student_id}}</h4>
                    </div>
                  </v-card>
                </div>
               
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    lastfivestudent: [
      {
        id: 1,
        name: "Hun Ravit",
        student_id: "e20180328",
        img_url: "../assets/e20180328.jpg"
      },
      {
        id: 2,
        name: "Hai Mengkuong",
        student_id: "e20180236",
        img_url: "../assets/e20180236.jpg"
      },
      {
        id: 3,
        name: "Chhon Devit",
        student_id: "e20180113",
        img_url: "../assets/e20180113.jpg"
      },
      {
        id: 4,
        name: "Keo Linna",
        student_id: "e20180368",
        img_url: "../assets/e20180236.jpg"
      },
      {
        id: 5,
        name: "Hourt Koemly",
        student_id: "e20180325",
        img_url: "../assets/e20180113.jpg"
      }
    ]
  }),
  methods: {
    animationwelcome() {
      setInterval(() => {
        this.ishidden = !this.ishidden;
      }, 2000);
    }
  },
  mounted() {
    this.animationwelcome();
  }
};
</script>
<style scoped>

#inspire {
  background-image: url("../assets/backgroundRegister.png");
 
}
.btn-submit{
  padding: 15px;
}
.row1 {
  display: flex;
  justify-content: center;
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
  color: white;
}
.row3 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.row3 .input-box {
  width: 40%;
}
.row3 .v-text-field {
  font-size: 1.2rem;
  font-weight: bold;
}

.row3 .example-id {
  color: white;
  font-size: 1.2rem;
}
.row4 .student-card {
  border-radius: 1rem;
  border: solid 0.2rem white;
}
.row4 .department {
  background-color: #0062e0;
  color: white;
}
</style>