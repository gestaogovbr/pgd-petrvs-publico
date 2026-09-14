import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { ARVORE_CONFIG, ARVORE_DATA_PROVIDER } from 'src/app/v2/components/arvore-institucional/tokens';
import { ArvoreLayoutService } from 'src/app/v2/components/arvore-institucional/infra/arvore-layout.service';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/infra/http/interceptors';
import { CadeiaValorArvoreApiClient } from './infra/cadeia-valor-arvore-api.client';
import { CadeiaValorArvoreAdapter, CADEIA_VALOR_ARVORE_CONFIG } from './infra/cadeia-valor-arvore.adapter';

/**
 * Rotas standalone do domínio árvore da cadeia de valor.
 */
export const cadeiaValorArvoreRoutes: Routes = [
  {
    path: 'arvore/:cadeiaValorId/:processoId',
    loadComponent: () =>
      import('src/app/v2/components/arvore-institucional/ui/arvore-institucional.page').then(
        m => m.ArvoreInstitucionalPage
      ),
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
      CadeiaValorArvoreApiClient,
      CadeiaValorArvoreAdapter,
      ArvoreLayoutService,
      { provide: ARVORE_DATA_PROVIDER, useExisting: CadeiaValorArvoreAdapter },
      { provide: ARVORE_CONFIG, useValue: CADEIA_VALOR_ARVORE_CONFIG },
    ]
  }
];
