import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('bootstrapAppModule', () => {
  //@ts-ignore
  const isEmbedded = typeof PETRVS_IS_SEI_MODULE != "undefined" ? !!PETRVS_IS_SEI_MODULE : typeof IS_PETRVS_EXTENSION !== "undefined" ? !!IS_PETRVS_EXTENSION : typeof PETRVS_IS_EXTENSION != "undefined" ? !!PETRVS_IS_EXTENSION : false;
  //@ts-ignore
  const baseUrl = typeof EXTENSION_BASE_URL !== "undefined" ? EXTENSION_BASE_URL : typeof PETRVS_BASE_URL != "undefined" ? PETRVS_BASE_URL : undefined;
  //@ts-ignore
  if(isEmbedded && baseUrl) __webpack_public_path__ = baseUrl;
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
