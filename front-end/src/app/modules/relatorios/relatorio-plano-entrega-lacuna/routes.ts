import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/http/interceptors';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { RelatorioPlanoEntregaLacunaApiClient } from './infra/relatorio-plano-entrega-lacuna-api.client';
import {
  ExportarRelatorioPlanoEntregaLacuna,
  ListarRelatorioPlanoEntregaLacuna,
} from './application/listar-lacunas.usecase';
import { RelatorioPlanoEntregaLacunaListFacade } from './application/list.facade';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      RelatorioPlanoEntregaLacunaApiClient,
      ListarRelatorioPlanoEntregaLacuna,
      ExportarRelatorioPlanoEntregaLacuna,
      RelatorioPlanoEntregaLacunaListFacade,
    ],
    loadComponent: () => import('./ui/list.page').then((m) => m.RelatorioPlanoEntregaLacunaListPage),
    data: {
      title: 'Lacunas de Planos de Entrega',
      breadcrumb: 'Lacunas de Planos de Entrega',
    },
  },
];
