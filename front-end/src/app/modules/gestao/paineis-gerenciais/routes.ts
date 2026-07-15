import { Routes } from '@angular/router';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Painéis Gerenciais' },
    providers: [BreadcrumbService],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ui/paineis-gerenciais.page').then(m => m.PaineisGerenciaisPage),
      },
      {
        path: 'alinhamento-desempenho',
        data: { breadcrumb: 'Alinhamento e Desempenho' },
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
      {
        path: 'gestao-pgd',
        data: { breadcrumb: 'Gestão do PGD' },
        loadComponent: () =>
          import('./ui/pages/gestao-pgd.page').then(m => m.GestaoPgdPage),
      },
    ],
  },
];
