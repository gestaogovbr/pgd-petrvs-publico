import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('bootstrapAppModule', () => {
  //@ts-ignore
  if(typeof IS_PETRVS_EXTENSION != "undefined" && typeof EXTENSION_BASE_URL != "undefined") __webpack_public_path__ = EXTENSION_BASE_URL;
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});