import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/index.vue')
  },
  {
    path: '/biblia',
    name: 'Biblia',
    component: () => import('../pages/biblia.vue')
  },
  {
    path: '/postagens',
    name: 'Postagens',
    component: () => import('../pages/postagens.vue')
  },
  {
    path: '/doacoes',
    name: 'Doações',
    component: () => import('../pages/doacoes.vue')
  },
  {
    path: '/arquivos',
    name: 'Arquivos',
    component: () => import('../pages/arquivos.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login.vue')
  },
  {
    path: '/administracao',
    name: 'Administração',
    component: () => import('../pages/admin.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegação para verificar autenticação
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Verifica se a rota requer autenticação
  if (to.meta.requiresAuth) {
    // Verifica se há um token armazenado
    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      // Não há token, redireciona para login
      next('/login')
      return
    }
    
    // Se não está autenticado no store, verifica o token
    if (!authStore.isLoggedIn) {
      try {
        await authStore.checkAuth()
        if (authStore.isLoggedIn) {
          next()
        } else {
          next('/login')
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        next('/login')
      }
    } else {
      next()
    }
  } else {
    // Rota não requer autenticação
    next()
  }
})

export default router
