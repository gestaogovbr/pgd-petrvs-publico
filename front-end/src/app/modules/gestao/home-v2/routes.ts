import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/infra/http/interceptors';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { HomeApiClient } from './infra/home-api.client';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Home' },
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      UnidadeService,
      BreadcrumbService,
      HomeApiClient,
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ui/home.page').then(m => m.HomeV2Page),
      },
    ],
  },
];
