import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/http/interceptors';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { EnvioPlanoTrabalhoApiClient } from './infra/envio-plano-trabalho-api.client';
import { ListarEnvioPlanoTrabalho } from './application/listar-envio-plano-trabalho.usecase';
import { EnvioPlanoTrabalhoListFacade } from './application/list.facade';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      EnvioPlanoTrabalhoApiClient,
      ListarEnvioPlanoTrabalho,
      EnvioPlanoTrabalhoListFacade,
    ],
    loadComponent: () => import('./ui/list.page').then((m) => m.EnvioPlanoTrabalhoListPage),
  },
];
