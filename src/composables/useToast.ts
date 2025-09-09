import { useToastStore } from '@/stores/toast'

export const useToast = () => {
  const toastStore = useToastStore()

  return {
    info: (message: string, timeout?: number) => toastStore.info(message, timeout),
    success: (message: string, timeout?: number) => toastStore.success(message, timeout),
    error: (message: string, timeout?: number) => toastStore.error(message, timeout),
    clear: () => toastStore.clear()
  }
}
