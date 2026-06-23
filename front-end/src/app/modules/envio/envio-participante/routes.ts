import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/http/interceptors';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { EnvioParticipanteApiClient } from './infra/envio-participante-api.client';
import { ListarEnvioParticipantes } from './application/listar-envio-participantes.usecase';
import { EnvioParticipanteListFacade } from './application/list.facade';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      EnvioParticipanteApiClient,
      ListarEnvioParticipantes,
      EnvioParticipanteListFacade
    ],
    loadComponent: () => import('./ui/list.page').then(m => m.EnvioParticipanteListPage)
  }
];
