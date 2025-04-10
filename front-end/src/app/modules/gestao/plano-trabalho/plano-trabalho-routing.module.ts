import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PlanoTrabalhoFormTermoComponent } from './plano-trabalho-form-termo/plano-trabalho-form-termo.component';
import { PlanoTrabalhoFormComponent } from './plano-trabalho-form/plano-trabalho-form.component';
import { PlanoTrabalhoListComponent } from './plano-trabalho-list/plano-trabalho-list.component';
import { PlanoTrabalhoListEntregaComponent } from './plano-trabalho-list-entrega/plano-trabalho-list-entrega.component';
import { PlanoTrabalhoConsolidacaoComponent } from './plano-trabalho-consolidacao/plano-trabalho-consolidacao.component';
import { PlanoTrabalhoConsolidacaoListComponent } from './plano-trabalho-consolidacao-list/plano-trabalho-consolidacao-list.component';
import { AvaliarComponent } from '../../uteis/avaliar/avaliar.component';
import { VisualizarAvaliacaoComponent } from '../../uteis/visualizar-avaliacao/visualizar-avaliacao.component';

import { PlanoTrabalhoConsolidacaoAvaliacaoComponent } from './plano-trabalho-consolidacao-avaliacao/plano-trabalho-consolidacao-avaliacao.component';
import { FazerRecursoComponent } from '../../uteis/avaliar/fazer-recurso/fazer-recurso.component';

const routes: Routes = [
  { path: '', component: PlanoTrabalhoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Planos de Trabalho" } },
  { path: 'new', component: PlanoTrabalhoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Plano de Trabalho", modal: true } },
  { path: 'termo', component: PlanoTrabalhoFormTermoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Termo de adesão", modal: true } },
  { path: 'consolidacao/avaliacao', component: PlanoTrabalhoConsolidacaoAvaliacaoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Avaliação das Consolidações do Plano de Trabalho" } },
  { path: 'consolidacao/:consolidacaoId/avaliar', component: AvaliarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Avaliar Consolidação do Plano de Trabalho" } },
  { path: 'avaliacao/:avaliacaoId/recurso', component: FazerRecursoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Recurso da Avaliação da Consolidação do Plano de Trabalho" } },
  { path: 'consolidacao/:consolidacaoId/verAvaliacoes', component: VisualizarAvaliacaoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Visualizar avaliações da Consolidação do Plano de Trabalho" } },
  { path: 'consolidacao/:usuarioId/:planoTrabalhoId', component: PlanoTrabalhoConsolidacaoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consolidações do Plano de Trabalho" } },
  { path: 'consolidacao', component: PlanoTrabalhoConsolidacaoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consolidações" } },
  { path: ':id/edit', component: PlanoTrabalhoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Plano de Trabalho", modal: true } },
  { path: ':id/clone', component: PlanoTrabalhoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Clone de Plano de Trabalho", modal: true } },
  { path: ':id/consult', component: PlanoTrabalhoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Plano de Trabalho", modal: true } },
  { path: 'entrega-list', component: PlanoTrabalhoListEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista de Entregas do Plano de Trabalho", modal: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoTrabalhoRoutingModule { }
