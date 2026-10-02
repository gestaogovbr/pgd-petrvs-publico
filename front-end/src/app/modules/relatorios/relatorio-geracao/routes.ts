import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/infra/http/interceptors';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { RelatorioGeracaoApiClient } from './infra/relatorio-geracao-api.client';
import { BaixarRelatorioGeracao, ConsultarStatusRelatorioGeracao, ListarRelatorioGeracao } from './application/relatorio-geracao.usecases';
import { RelatorioGeracaoListFacade } from './application/list.facade';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      RelatorioGeracaoApiClient,
      ListarRelatorioGeracao,
      ConsultarStatusRelatorioGeracao,
      BaixarRelatorioGeracao,
      RelatorioGeracaoListFacade,
    ],
    loadComponent: () => import('./ui/list.page').then((m) => m.RelatorioGeracaoListPage),
  },
];
