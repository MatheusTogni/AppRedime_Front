<template>
  <v-snackbar
    v-for="toast in toasts"
    :key="toast.id"
    :model-value="getToastVisibility(toast.id)"
    :color="getToastColor(toast.type)"
    :timeout="toast.timeout"
    location="top right"
    max-width="400"
    min-width="300"
    class="toast-snackbar"
    @update:model-value="(value) => handleToastClose(toast.id, value)"
  >
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-icon
          :icon="getToastIcon(toast.type)"
          class="mr-2"
          size="20"
        />
        <span class="toast-message">{{ toast.message }}</span>
      </div>
      <v-btn
        variant="text"
        icon="mdi-close"
        size="x-small"
        class="ml-2"
        @click="removeToast(toast.id)"
      />
    </div>

  </v-snackbar>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts)
const visibilityMap = ref<Record<string, boolean>>({})
watch(toasts, (newToasts) => {
  newToasts.forEach(toast => {
    if (!(toast.id in visibilityMap.value)) {
      visibilityMap.value[toast.id] = true
    }
  })
}, { immediate: true, deep: true })

const getToastVisibility = (id: string) => {
  return visibilityMap.value[id] ?? true
}

const handleToastClose = (id: string, value: boolean) => {
  visibilityMap.value[id] = value
  if (!value) {
    removeToast(id)
  }
}

const removeToast = (id: string) => {
  delete visibilityMap.value[id]
  toastStore.removeToast(id)
}

const getToastColor = (type: 'info' | 'success' | 'error') => {
  const colors = {
    info: 'blue',
    success: 'green',
    error: 'red'
  }
  return colors[type]
}

const getToastIcon = (type: 'info' | 'success' | 'error') => {
  const icons = {
    info: 'mdi-information',
    success: 'mdi-check-circle',
    error: 'mdi-alert-circle'
  }
  return icons[type]
}
</script>

<style scoped>
.toast-snackbar {
  margin-bottom: 8px;
}

.toast-message {
  font-weight: 500;
  line-height: 1.3;
  font-size: 0.875rem;
  flex: 1;
}

:deep(.v-snackbar__wrapper) {
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
}

:deep(.v-snackbar__content) {
  padding: 12px 16px;
}

:deep(.v-btn--size-x-small) {
  min-width: 24px;
  width: 24px;
  height: 24px;
}
</style>
