/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import http from './http'
import toast from './toast'

import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(http)
    .use(toast)
}
