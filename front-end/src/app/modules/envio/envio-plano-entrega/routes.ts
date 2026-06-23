import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/http/interceptors';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { EnvioPlanoEntregaApiClient } from './infra/envio-plano-entrega-api.client';
import { ListarEnvioPlanoEntrega } from './application/listar-envio-plano-entrega.usecase';
import { EnvioPlanoEntregaListFacade } from './application/list.facade';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      EnvioPlanoEntregaApiClient,
      ListarEnvioPlanoEntrega,
      EnvioPlanoEntregaListFacade,
    ],
    loadComponent: () => import('./ui/list.page').then((m) => m.EnvioPlanoEntregaListPage),
  },
];
