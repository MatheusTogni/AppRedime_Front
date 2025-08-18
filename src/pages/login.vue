<template>
  <v-container fluid class="fill-height pa-0" style="background-color: #121212">
    <v-row justify="center" align="center" style="height: 100%">
      <v-col cols="12" sm="8" md="6" lg="4" class="pa-4">
        <v-card
          class="pa-8 login-card"
          style="background-color: #121212; border-radius: 20px"
        >
          <div class="text-center mb-8">
            <v-icon size="64" color="#af1d36" class="mb-4">mdi-crown</v-icon>
            <h1 class="text-h4 font-weight-bold mb-6" style="color: #af1d36">
              Redime App
            </h1>
          </div>

          <v-form @submit.prevent="handleLogin" class="login-form">
            <v-text-field
              v-model="login"
              label="Login"
              variant="outlined"
              class="mb-4 login-field"
              bg-color="white"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Senha"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              class="mb-6 login-field"
              bg-color="white"
            ></v-text-field>

            <v-btn
              type="submit"
              block
              class="mb-6 login-button"
              style="
                background-color: #af1d36;
                color: white;
                height: 48px;
                font-size: 1.1rem;
              "
              :loading="loading"
            >
              Entrar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",

  data() {
    return {
      login: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  },

  methods: {
    async handleLogin() {

    },


    goToRegister() {
      this.$router.push("/register");
    },
  },
});
</script>

<style scoped>
.login-card {
  background-color: #232323 !important;
}

.login-button {
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  background-color: #af1d36 !important;
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
}

:deep(.v-card) {
  box-shadow: none !important;
  border: none !important;
}
</style>
