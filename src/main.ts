import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import { useAuthStore } from '@/stores/auth'

import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

// Inicializar verificação de autenticação após montar a aplicação
app.provide('initAuth', () => {
  const authStore = useAuthStore()
  authStore.checkAuth()
})
