import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/http/interceptors';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { RelatorioEntregaApiClient } from './infra/relatorio-entrega-api.client';
import {
  ExportarRelatorioEntrega,
  ListarRelatorioEntrega,
  ObterUnidadePadraoRelatorioEntrega,
} from './application/relatorio-entrega.usecases';
import { RelatorioEntregaListFacade } from './application/list.facade';
import { RelatorioEntregaUnidadesService } from './application/relatorio-entrega-unidades.service';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      RelatorioEntregaApiClient,
      ListarRelatorioEntrega,
      ExportarRelatorioEntrega,
      ObterUnidadePadraoRelatorioEntrega,
      RelatorioEntregaListFacade,
      RelatorioEntregaUnidadesService,
    ],
    loadComponent: () => import('./ui/list.page').then((m) => m.RelatorioEntregaListPage),
  },
];
