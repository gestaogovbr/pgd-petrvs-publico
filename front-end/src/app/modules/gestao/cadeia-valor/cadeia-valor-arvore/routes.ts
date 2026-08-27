import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/infra/http/interceptors';
import { CadeiaValorArvoreApiClient } from './infra/cadeia-valor-arvore-api.client';

/**
 * Rotas standalone do domínio árvore da cadeia de valor (interceptors, infra por rota).
 */
export const cadeiaValorArvoreRoutes: Routes = [
  {
    path: 'arvore/:cadeiaValorId/:processoId',
    loadComponent: () =>
      import('./ui/cadeia-valor-arvore.page').then(m => m.CadeiaValorArvorePage),
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Árvore da Cadeia de Valor',
      breadcrumb: 'Árvore da Cadeia de Valor',
      breadcrumbParents: [
        { label: 'Cadeias de Valor', url: '/gestao/cadeia-valor' }
      ]
    },
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      CadeiaValorArvoreApiClient
    ]
  }
];
