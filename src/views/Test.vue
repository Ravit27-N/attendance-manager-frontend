<template>
  <div class="contain">
    <div class="image-contain">
      <h2>Welcome Back!</h2>
      <h3>Login and start engaging your data!</h3>
      <img class="image" src="../assets/Login.png" alt />
    </div>
    <div class="fill-contain">
      <div cols="12" md="8" class="contain-login">
        <v-card-text class="mt-12">
          <h1 class="text-center">USERLOGIN</h1>

          <v-form>
            <v-text-field
              label="Email"
              name="Email"
              prepend-icon="email"
              class="field-input"
              type="text"
              color="white accent-3"
            />

            <v-text-field
              id="password"
              label="Password"
              name="password"
              class="field-input"
              prepend-icon="lock"
              type="password"
              color="white accent-3"
            />
          </v-form>
          <h3 class="text-left mt-4">Forgot your password ?</h3>
        </v-card-text>
        <div class="text-center mt-3">
          <v-btn rounded color="white" class="btn-login">Log In</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contain {
  width: 100%;
  background-color: aqua;
  display: flex;
}
.image-contain {
  width: 40%;
}
.image-contain .img {
  width: 90%;
}
</style>