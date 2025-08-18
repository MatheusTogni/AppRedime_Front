import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

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
    path: '/administracao',
    name: 'Administração',
    component: () => import('../pages/login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
