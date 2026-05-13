import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/infra/http/interceptors';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { TipoObjetivoApiClient } from './infra/tipo-objetivo-api.client';
import { TipoObjetivoFacade } from './application/tipo-objetivo.facade';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Tipos de Objetivos' },
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      TipoObjetivoApiClient,
      TipoObjetivoFacade
    ],
    loadComponent: () => import('./ui/list.page').then(m => m.TipoObjetivoV2ListPage)
  }
];
