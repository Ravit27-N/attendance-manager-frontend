<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center">
          <v-col cols="12" sm="12" md="12">
            <div class="row1">
              <a href="/#">
                <img src="../assets/Stemlogo.png" width="75" height="75" alt />
              </a>
              <div class="space"></div>
              <a href="/admin" class="mt-1">
                <img src="../assets/user.png" width="70" height="70" alt />
              </a>
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
              <v-form class="input-box" ref="form">
                <v-row class="pt-7">
                  <v-text-field
                    class="mr-2"
                    solo
                    placeholder="Please enter your student's Id"
                    outlined
                    clearable
                    v-model="submit_data.student_id"
                    :rules="studentIdRules"
                    @keydown.enter.prevent="submit_from"
                  ></v-text-field>
                  <v-btn class="btn-submit" @click="submit_from" dark x-large color="blue">SUBMIT</v-btn>
                </v-row>
                <p class="example-id">Example: e20180328</p>
              </v-form>
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
                      <img :src="item.imageurl" alt height="150" />
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
    <div>
      <v-snackbar
        v-model="snackbar"
        top
        center
        :color="snackbarColor"
        timeout="2000"
        rounded="pill"
        height="20"
      >
        {{snackbarText}}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
import AttendanceService from "../services/AttendanceService";
export default {
  data: () => ({
    studentIdRules: [
      // v => (v && v.length == 9) || "Student ID must be 9 characters"
    ],
    submit_data: { student_id: "" },
    ishidden: true,
    lastfivestudent: [],
    snackbarText: "",
    snackbarColor: "green"
  }),
  methods: {
    animationwelcome() {
      setInterval(() => {
        this.ishidden = !this.ishidden;
      }, 2000);
    },
    get_lastfive_attendance() {
      AttendanceService.getLastAttendance()
        .then(response => {
          let i = 0;
          this.lastfivestudent = response.data.attendance;
          for (i in this.lastfivestudent) {
            if (this.lastfivestudent[i].imageurl == null) {
              this.lastfivestudent[i].imageurl =
                "http://localhost:3000/uploads/guest.jpg";
            }
            if (this.lastfivestudent[i].name == null) {
              this.lastfivestudent[i].name = "Guest";
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
 
    submit_from() {
      if (this.submit_data.student_id.length <= 0) {
        alert("Student ID must be input");
      } else {
        this.get_student_by_id();
      }
    },
    upload_attendance() {
      
      AttendanceService.create(this.submit_data)
        .then(response => {
          if (response) {
            this.get_lastfive_attendance();
            this.$refs.form.reset();
            this.snackbarColor = "green";
            this.snackbarText = "Register Success";
            this.snackbar = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    get_student_by_id() {
      axios
        .post(`http://localhost:3000/candidate/studentid`, this.submit_data)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            // console.log(this.info.data);

            if (this.info.data.student == null) {
              this.$refs.form.reset();
              this.snackbarColor = "red";
              this.snackbarText = "Student's ID cannot find! Please register before join library";
              this.snackbar = true;
            } else {
              this.upload_attendance();
            }
          }
        });
    }
  },
  mounted() {
    this.animationwelcome();
    this.get_lastfive_attendance();
  }
};
</script>
<style scoped>
#inspire {
  background-image: url("../assets/backgroundRegister.png");
}
.btn-submit {
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
.v-messages__message {
  color: aqua;
}
</style>