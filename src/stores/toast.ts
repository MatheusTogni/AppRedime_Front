import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Toast {
  id: string
  message: string
  type: 'info' | 'success' | 'error'
  timeout?: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      id,
      ...toast,
      timeout: toast.timeout || 4000
    }
    
    toasts.value.push(newToast)
    
    // Auto remove toast after timeout
    setTimeout(() => {
      removeToast(id)
    }, newToast.timeout)
    
    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const info = (message: string, timeout?: number) => {
    return addToast({ message, type: 'info', timeout })
  }

  const success = (message: string, timeout?: number) => {
    return addToast({ message, type: 'success', timeout })
  }

  const error = (message: string, timeout?: number) => {
    return addToast({ message, type: 'error', timeout })
  }

  const clear = () => {
    toasts.value = []
  }

  return {
    toasts,
    addToast,
    removeToast,
    info,
    success,
    error,
    clear
  }
})
