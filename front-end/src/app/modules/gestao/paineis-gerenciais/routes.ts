import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/infra/http/interceptors';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { PainelApiClient } from './infra/painel-api.client';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Painéis Gerenciais' },
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      UnidadeService,
      PainelApiClient,
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ui/paineis-gerenciais.page').then(m => m.PaineisGerenciaisPage),
      },
      {
        path: 'alinhamento-desempenho',
        data: { breadcrumb: 'Alinhamento e Avaliações' },
        loadComponent: () =>
          import('./ui/pages/alinhamento-desempenho.page').then(m => m.AlinhamentoDesempenhoPage),
      },
      {
        path: 'conformidade',
        data: { breadcrumb: 'Conformidade' },
        loadComponent: () =>
          import('./ui/pages/conformidade.page').then(m => m.ConformidadePage),
      },
      {
        path: 'modalidades',
        data: { breadcrumb: 'Modalidades' },
        loadComponent: () =>
          import('./ui/pages/modalidades.page').then(m => m.ModalidadesPage),
      },
      // {
      //   path: 'gestao-pgd',
      //   data: { breadcrumb: 'Abrangência do PGD' },
      //   loadComponent: () =>
      //     import('./ui/pages/gestao-pgd.page').then(m => m.GestaoPgdPage),
      // },
    ],
  },
];
