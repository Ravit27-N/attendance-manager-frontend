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
                      <v-col cols="8" md="4" class="gray">
                        <v-card-text class=" mt-12">
                          <h3 class="text-center display-1">Welcome Back!</h3>
                          <h3
                            class="text-center"
                          >Login and start engaging your data!</h3>
                        </v-card-text>
                        
                      </v-col>
                      <v-col cols="12" md="8" class="blue">
                        <v-card-text class="mt-12">
                          <h1
                            class="text-center "
                          >USERLOGIN</h1>
                        
                          <v-form>
                            <v-text-field
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3"
                            />
  
                            <v-text-field
                              id="password"
                              label="Password"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="teal accent-3"
                            />
                          </v-form>
                          <h3 class="text-left mt-4">Forgot your password ?</h3>
                        </v-card-text>
                        <div class="text-center mt-3">
                          <v-btn rounded color="white" >Log In</v-btn>
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