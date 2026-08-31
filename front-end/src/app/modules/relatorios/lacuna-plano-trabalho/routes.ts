import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/http/interceptors';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { LacunaPlanoTrabalhoApiClient } from './infra/lacuna-plano-trabalho-api.client';
import { ListarLacunaPlanoTrabalho } from './application/listar-lacuna-plano-trabalho.usecase';
import { ExportarLacunaPlanoTrabalho } from './application/exportar-lacuna-plano-trabalho.usecase';
import { LacunaPlanoTrabalhoListFacade } from './application/list.facade';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      LacunaPlanoTrabalhoApiClient,
      ListarLacunaPlanoTrabalho,
      ExportarLacunaPlanoTrabalho,
      LacunaPlanoTrabalhoListFacade,
    ],
    loadComponent: () => import('./ui/list.page').then((m) => m.LacunaPlanoTrabalhoListPage),
  },
];
