import { defineStore } from 'pinia'
import { httpService } from '@/services/httpService'

export interface User {
  id: string
  login: string
  // Adicione outras propriedades do usuário conforme necessário
}

export interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('auth_token'),
    user: null,
    isAuthenticated: false
  }),

  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated && !!state.token
  },

  actions: {
    async login(credentials: { login: string; password: string }) {
      try {
        const response = await httpService.post('auth/login', credentials)
        
        if (response.data.token) {
          this.token = response.data.token
          this.user = response.data.user
          this.isAuthenticated = true
          
          // Armazena o token no localStorage
          localStorage.setItem('auth_token', response.data.token)
          
          // Se houver informações do usuário, armazena também
          if (response.data.user) {
            localStorage.setItem('auth_user', JSON.stringify(response.data.user))
          }
        }
        
        return response.data
      } catch (error) {
        this.clearAuth()
        throw error
      }
    },

    async logout() {
      try {
        // Opcional: chamar endpoint de logout no backend
        if (this.token) {
          await httpService.post('auth/logout')
        }
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
      } finally {
        this.clearAuth()
      }
    },

    async checkAuth() {
      const token = localStorage.getItem('auth_token')
      const userStr = localStorage.getItem('auth_user')
      
      if (token) {
        this.token = token
        
        if (userStr) {
          try {
            this.user = JSON.parse(userStr)
          } catch (error) {
            console.error('Erro ao parsear usuário do localStorage:', error)
          }
        }
        
        // Verifica se o token ainda é válido
        try {
          const response = await httpService.get('auth/verify')
          if (response.data.valid) {
            this.isAuthenticated = true
            if (response.data.user) {
              this.user = response.data.user
              localStorage.setItem('auth_user', JSON.stringify(response.data.user))
            }
          } else {
            this.clearAuth()
          }
        } catch (error) {
          console.error('Token inválido:', error)
          this.clearAuth()
        }
      }
    },

    clearAuth() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    },

    async refreshToken() {
      try {
        if (!this.token) return false
        
        const response = await httpService.post('auth/refresh')
        if (response.data.token) {
          this.token = response.data.token
          localStorage.setItem('auth_token', response.data.token)
          return true
        }
        return false
      } catch (error) {
        console.error('Erro ao renovar token:', error)
        this.clearAuth()
        return false
      }
    }
  }
})
