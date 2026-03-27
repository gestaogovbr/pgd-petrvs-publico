import { Routes } from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from './infra/http/interceptors';
import { UsuarioService } from 'src/app/v2/services/usuario.service';
import { ProgramaApiService } from 'src/app/v2/services/programa-api.service';
import { TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { GovBrAssetsService } from 'src/app/v2/services/govbr-assets.service';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      UsuarioService,
      ProgramaApiService,
      TipoModalidadeService,
      GovBrAssetsService,
      {
        provide: APP_INITIALIZER,
        multi: true,
        deps: [GovBrAssetsService],
        useFactory: (assets: GovBrAssetsService) => () => assets.load()
      }
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ui/list.page').then(m => m.PlanoTrabalhoV2ListPage)
      },
      {
        path: 'novo',
        loadComponent: () =>
          import('./ui/new.page').then(m => m.PlanoTrabalhoV2NewPage)
      }
    ]
  }
];
