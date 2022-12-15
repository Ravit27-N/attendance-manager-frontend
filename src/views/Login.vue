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
                            append-icon="mdi-email"
                            type="email"
                            outlined
                            clearable
                          ></v-text-field>
                          <label for="Email">Password</label>
                          <v-text-field
                            solo
                            label="Enter your password"
                            append-icon="mdi-lock"
                            outlined
                            type="password"
                            clearable
                          ></v-text-field>
                         
                          
                        </div>
                        <a href class="text-left forgotlink">Forgot password?</a>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="white" class="btn-login">Log In</v-btn>
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
  </v-app>
</template>
 
  <script>
export default {
  data: () => ({
    step: 1
  }),
  props: {
    source: String
  }
};
</script>
<style scoped>
.contain-image{
  background-color: #F3F1F1;
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
  margin-bottom: 0.3rem ;
}
.btn-login {
  color: #0062e0;
  font-size: 1rem;
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
  text-decoration: none;
}
.form-input{
  margin-top: 1rem;
}
.form-input label{
  color: white;
  font-size: 1rem;
  margin-left: 0.3rem;
}

</style>