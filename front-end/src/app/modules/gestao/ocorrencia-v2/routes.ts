import { Routes } from '@angular/router';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Ocorrências' },
    providers: [BreadcrumbService],
    children: [
      {
        path: '',
        loadComponent: () => import('./ui/list.page').then(m => m.OcorrenciaV2ListPage),
      },
      {
        path: 'nova',
        data: { breadcrumb: 'Nova' },
        loadComponent: () => import('./ui/form.page').then(m => m.OcorrenciaV2FormPage),
      },
      {
        path: 'editar/:id',
        data: { breadcrumb: 'Editar' },
        loadComponent: () => import('./ui/form.page').then(m => m.OcorrenciaV2FormPage),
      },
    ],
  },
];
