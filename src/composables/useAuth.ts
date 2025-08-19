import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const isAuthenticated = computed(() => authStore.isLoggedIn)
  const user = computed(() => authStore.user)
  const token = computed(() => authStore.token)

  const login = async (credentials: { login: string; password: string }) => {
    try {
      await authStore.login(credentials)
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const logout = async () => {
    try {
      await authStore.logout()
      router.push('/login')
      return { success: true }
    } catch (error) {
      authStore.clearAuth()
      router.push('/login')
      return { success: false, error }
    }
  }

  const checkAuth = async () => {
    try {
      await authStore.checkAuth()
      return authStore.isLoggedIn
    } catch (error) {
      return false
    }
  }

  const requireAuth = () => {
    if (!authStore.isLoggedIn) {
      router.push('/login')
      return false
    }
    return true
  }

  return {
    // Estado
    isAuthenticated,
    user,
    token,
    
    // Ações
    login,
    logout,
    checkAuth,
    requireAuth
  }
}
