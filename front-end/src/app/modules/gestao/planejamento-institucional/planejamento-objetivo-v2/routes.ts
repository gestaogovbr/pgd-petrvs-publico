import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { authTenantVersionInterceptor, errorInterceptor } from 'src/app/v2/infra/http/interceptors';
import { PlanejamentoObjetivoEsforcoApiClient } from './infra/planejamento-objetivo-esforco-api.client';

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
      breadcrumb: 'Gráfico de objetivos e esforço'
    },
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      BreadcrumbService,
      PlanejamentoObjetivoEsforcoApiClient
    ]
  }
];
