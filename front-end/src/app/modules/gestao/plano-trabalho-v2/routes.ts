import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from './infra/http/interceptors';
import { UsuarioService } from 'src/app/v2/services/usuario.service';
import { ProgramaApiService } from 'src/app/v2/services/programa-api.service';
import { TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { PlanoEntregaApiService } from 'src/app/v2/services/plano-entrega-api.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';
import { PlanoTrabalhoPolicy } from './application/plano-trabalho.policy';
import { ConsolidacaoPolicy } from './application/consolidacao.policy';
import { PlanoApiClient } from './infra/plano-api.client';
import { ConsolidacaoApiClient } from './infra/consolidacao-api.client';
import { DocumentoApiClient } from './infra/documento-api.client';
import { ListarPlanos } from './application/listar-planos.usecase';
import { CancelarPlanoUseCase } from './application/cancelar-plano.usecase';
import { ConcluirConsolidacaoUseCase } from './application/concluir-consolidacao.usecase';
import { AvaliarConsolidacaoUseCase } from './application/avaliar-consolidacao.usecase';
import { SolicitarRecursoUseCase } from './application/solicitar-recurso.usecase';
import { PlanoTrabalhoListFacade } from './application/list.facade';
import { ConsolidacaoFacade } from './application/consolidacao.facade';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Planos de Trabalho' },
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      // Serviços compartilhados
      UsuarioService,
      ProgramaApiService,
      TipoModalidadeService,
      PlanoEntregaApiService,
      UnidadeService,
      BreadcrumbService,
      // Policies
      PlanoTrabalhoPolicy,
      ConsolidacaoPolicy,
      // Infra
      PlanoApiClient,
      ConsolidacaoApiClient,
      DocumentoApiClient,
      // Use cases
      ListarPlanos,
      CancelarPlanoUseCase,
      ConcluirConsolidacaoUseCase,
      AvaliarConsolidacaoUseCase,
      SolicitarRecursoUseCase,
      // Facades
      PlanoTrabalhoListFacade,
      ConsolidacaoFacade,
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ui/list.page').then(m => m.PlanoTrabalhoV2ListPage)
      },
      {
        path: 'novo',
        data: { breadcrumb: 'Novo' },
        loadComponent: () =>
          import('./ui/new.page').then(m => m.PlanoTrabalhoV2NewPage)
      },
      {
        path: 'editar/:id',
        data: { breadcrumb: 'Editar' },
        loadComponent: () =>
          import('./ui/edit.page').then(m => m.PlanoTrabalhoV2EditPage)
      },
      {
        path: 'consultar/:id',
        data: { breadcrumb: 'Consultar' },
        loadComponent: () =>
          import('./ui/show.page').then(m => m.PlanoTrabalhoV2ShowPage)
      },
      {
        path: 'tcr/:id',
        data: { breadcrumb: 'TCR' },
        loadComponent: () =>
          import('./ui/tcr.page').then(m => m.PlanoTrabalhoV2TcrPage)
      }
    ]
  }
];
