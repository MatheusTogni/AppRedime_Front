import type { App } from 'vue';
import { httpService } from '../services/httpService';

export default {
  install(app: App) {
    app.config.globalProperties.HTTP = httpService.request.bind(httpService);
    
    app.config.globalProperties.http = httpService;
  }
};
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    HTTP: typeof httpService.request;
    http: typeof httpService;
  }
}
