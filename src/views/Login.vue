<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6" class="gray contain-image">
                      <v-card-text class="mt-12">
                        <h3 class="title-image welcome display-1">Welcome Back!</h3>
                        <h3 class="title-image">Login and start engaging your data!</h3>
                        <div class="image-login">
                          <img class="image" src="../assets/Login.png" alt />
                        </div>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="6" class="contain-login">
                      <v-card-text class="mt-12">
                        <div class="text-center">
                          <img src="../assets/user.png" alt />
                        </div>
                        <h1 class="text-center login-title">USERLOGIN</h1>
                        <div class="form-input">
                          <label for="Email">Email</label>
                          <v-text-field
                            solo
                            label="Enter your email"
                            name="Email"
                            v-model="submit_data.email"
                            append-icon="mdi-email"
                            type="email"
                            required
                            outlined
                            clearable
                          ></v-text-field>
                          <label for="Email">Password</label>
                          <v-text-field
                            solo
                            v-model="submit_data.password"
                            label="Enter your password"
                            :type="show1 ? 'text' : 'password'"
                            outlined
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="show1 = !show1"
                          ></v-text-field>
                          <a href class="text-left forgotlink">Forgot password?</a>
                        </div>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="white" class="btn-login" @click="login">Log In</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <div>
      <v-snackbar
      v-model="snackbar"
      top
      right
      :color="snackbarColor"
      timeout="2000"
      rounded="pill"
      height="20"
    >
      {{snackbarText}}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    </div>
  </v-app>
</template>
 
  <script>

import axios from "axios";
export default {
  data: () => ({
    step: 1,
    show1: false,
    submit_data: {
      email: "hunravit2711@gmail.com",
      password: "1111"
    },
    snackbarText:"",
    snackbarColor:"",
    snackbar: false
  }),
  methods: {
    login() {
      
      console.log(this.submit_data);
      axios
        .post(`http://localhost:3000/user/login`, this.submit_data)
        .then(response => (this.info = response))
        .then(() => {
          if (this.info) {
            console.log(this.info);
            sessionStorage.setItem("Token", this.info.data.token);
            this.snackbarText = "Login Success";
            this.snackbarColor="green";
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push({ name: "Admin" });
            }, 2000);
          }
        }).catch(e => {
          console.log(e);
        });
    }
  },
  props: {}
};
</script>
<style scoped>
.contain-image {
  background-color: #f3f1f1;
}
.title-image {
  margin-left: 1rem;
  color: #0062e0;
}
.welcome {
  font-size: 2rem !important;
  font-weight: bold;
}
.contain-login {
  background-color: #0062e0;
}
.contain-login img {
  width: 5vw;
  margin-bottom: 0.3rem;
}
.btn-login {
  color: #0062e0;
  font-size: 1.2rem;
}
.image {
  width: 30vw;
}
.login-title {
  color: white;
}
.forgotlink {
  text-align: left;
  color: white;
  margin-left: 1rem;
  text-decoration: none;
  font-size: 1rem;
}
.form-input {
  margin-top: 1rem;
  padding: 0px 1.5rem;
}
.form-input label {
  color: white;
  font-size: 1rem;
  margin: 0.3rem;
  font-size: 1.2rem;
}
.form-input .v-text-field {
  font-size: 1.2rem;
}
.contain-input {
  display: flex;
}
.input-box {
  width: 150vw;
}
</style>