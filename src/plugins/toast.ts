import type { App } from 'vue'
import { useToast } from '@/composables/useToast'

export interface ToastPlugin {
  info: (message: string, timeout?: number) => string
  success: (message: string, timeout?: number) => string
  error: (message: string, timeout?: number) => string
  clear: () => void
}

export default {
  install(app: App) {
    const toast = useToast()
    
    app.config.globalProperties.$toast = toast
    app.provide('toast', toast)
  }
}

// Adicionar tipos para TypeScript
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: ToastPlugin
  }
}
