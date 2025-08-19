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
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "LoginPage",

  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    return { router, authStore };
  },

  data() {
    return {
      login: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  },

  async mounted() {
    // Se já está autenticado, redireciona para administração
    if (this.authStore.isLoggedIn) {
      this.router.push("/administracao");
    }
  },

  methods: {
    async handleLogin() {
      if (!this.login.trim() || !this.password.trim()) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      this.loading = true;
      try {
        await this.authStore.login({
          login: this.login.trim(),
          password: this.password,
        });

        alert("Login realizado com sucesso!");
        this.router.push("/administracao");
      } catch (error: any) {
        console.error("Erro no login:", error);

        // Exibe a mensagem de erro que vem do backend
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else if (error.response?.data?.error) {
          alert(error.response.data.error);
        } else if (error.response?.status === 401) {
          alert("Credenciais inválidas.");
        } else if (error.code === "ECONNREFUSED") {
          alert("Erro de conexão. Verifique se o servidor está rodando.");
        } else {
          alert("Erro ao tentar fazer login. Tente novamente.");
        }
      } finally {
        this.loading = false;
      }
    },

    goToRegister() {
      this.router.push("/register");
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
