<template>
  <div class="auth-info">
    <div v-if="isAuthenticated" class="user-info">
      <v-chip
        color="primary"
        variant="outlined"
        prepend-icon="mdi-account"
        class="mr-2"
      >
        {{ user?.login }}
      </v-chip>
      <v-btn
        color="error"
        variant="text"
        size="small"
        prepend-icon="mdi-logout"
        @click="handleLogout"
      >
        Sair
      </v-btn>
    </div>
    <div v-else>
      <v-btn
        color="primary"
        variant="outlined"
        prepend-icon="mdi-login"
        @click="goToLogin"
      >
        Entrar
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const { isAuthenticated, user, logout } = useAuth()
const router = useRouter()

const handleLogout = async () => {
  const result = await logout()
  if (result.success) {
    alert('Logout realizado com sucesso!')
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.auth-info {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}
</style>
