import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { ARVORE_CONFIG, ARVORE_DATA_PROVIDER } from 'src/app/v2/components/arvore-institucional/tokens';
import { ArvoreLayoutService } from 'src/app/v2/components/arvore-institucional/infra/arvore-layout.service';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/infra/http/interceptors';
import { PlanejamentoObjetivoEsforcoApiClient } from './infra/planejamento-objetivo-esforco-api.client';
import { PlanejamentoArvoreAdapter, PLANEJAMENTO_ARVORE_CONFIG } from './infra/planejamento-arvore.adapter';

/**
 * Rotas v2 do domínio objetivo de planejamento (standalone, interceptors, infra por rota).
 */
export const planejamentoObjetivoV2Routes: Routes = [
  {
    path: 'objetivo-grafico/:id',
    loadComponent: () =>
      import('./ui/planejamento-objetivo-grafico.page').then(m => m.PlanejamentoObjetivoGraficoPage),
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Gráfico de objetivos e esforço',
      breadcrumb: 'Gráfico de objetivos e esforço',
      breadcrumbParents: [
        { label: 'Planejamentos Institucionais', url: '/gestao/planejamento' }
      ]
    },
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      PlanejamentoObjetivoEsforcoApiClient
    ]
  },
  {
    path: 'objetivo-arvore/:id',
    loadComponent: () =>
      import('src/app/v2/components/arvore-institucional/ui/arvore-institucional.page').then(
        m => m.ArvoreInstitucionalPage
      ),
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Árvore de objetivos',
      breadcrumb: 'Árvore de objetivos',
      breadcrumbParents: [
        { label: 'Planejamentos Institucionais', url: '/gestao/planejamento' }
      ]
    },
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      PlanejamentoObjetivoEsforcoApiClient,
      PlanejamentoArvoreAdapter,
      ArvoreLayoutService,
      { provide: ARVORE_DATA_PROVIDER, useExisting: PlanejamentoArvoreAdapter },
      { provide: ARVORE_CONFIG, useValue: PLANEJAMENTO_ARVORE_CONFIG },
    ]
  }
];
