import type { App } from 'vue';
import { httpService } from '../services/httpService';

export default {
  install(app: App) {
    // Adiciona o método HTTP globalmente (sem cifrão)
    app.config.globalProperties.HTTP = httpService.request.bind(httpService);
    
    // Também adiciona o serviço completo
    app.config.globalProperties.http = httpService;
  }
};

// Declaração de tipos para TypeScript
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    HTTP: typeof httpService.request;
    http: typeof httpService;
  }
}
