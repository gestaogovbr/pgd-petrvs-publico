import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PlanoEntregaListComponent } from './plano-entrega-list/plano-entrega-list.component';
import { PlanoEntregaFormComponent } from './plano-entrega-form/plano-entrega-form.component';
import { PlanoEntregaMapaEntregasComponent } from './plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component';
import { PlanoEntregaFormAdesaoComponent } from './plano-entrega-form-adesao/plano-entrega-form-adesao.component';
import { PlanoEntregaFormEntregaComponent } from './plano-entrega-form-entrega/plano-entrega-form-entrega.component';
import { PlanoEntregaListLogsComponent } from './plano-entrega-list-logs/plano-entrega-list-logs.component';
import { PlanoEntregaListEntregaListComponent } from './plano-entrega-list-entrega-list/plano-entrega-list-entrega-list.component';
import { AvaliarComponent } from '../../uteis/avaliar/avaliar.component';
import { PlanoEntregaListProgressoComponent } from './plano-entrega-list-progresso/plano-entrega-list-progresso.component';
import { PlanoEntregaFormProgressoComponent } from './plano-entrega-form-progresso/plano-entrega-form-progresso.component';
import { PlanoEntregaEntregaDetalhesComponent } from './plano-entrega-entrega-detalhes/plano-entrega-entrega-detalhes.component';

const routes: Routes = [
  { path: '', component: PlanoEntregaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Plano de Entregas" } },
  { path: 'new', component: PlanoEntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Plano de Entregas", modal: true } },
  { path: ':id/edit', component: PlanoEntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Plano de Entregas", modal: true } },
  { path: ':id/consult', component: PlanoEntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Plano de Entregas", modal: true } },
  { path: ':id/logs', component: PlanoEntregaListLogsComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Logs de Alterações em Planos de Entregas", modal: true } },
  { path: ':planoEntregaId/avaliar', component: AvaliarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Avaliar Plano de Entrega" } },
  { path: 'entrega', component: PlanoEntregaFormEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas do Plano de Entregas", modal:true }},
  { path: 'entrega/:id/consult', component: PlanoEntregaFormEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta entrega do Plano de Entregas", modal:true }},
  { path: 'entrega/:id/detalhes', component: PlanoEntregaEntregaDetalhesComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Detalhes da entrega do Plano de Entregas", modal:true }},
  { path: 'entrega-list', component: PlanoEntregaListEntregaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas do Plano de Entregas", modal:true }},
  { path: 'entrega/objetivos/:objetivo_id', component: PlanoEntregaMapaEntregasComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas do Plano de Entregas", modal: true } },
  { path: 'entrega/processos/:processo_id', component: PlanoEntregaMapaEntregasComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas do Plano de Entregas", modal: true } },
  { path: 'adesao', component: PlanoEntregaFormAdesaoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Adesão a Plano de Entregas", modal: true } },
  { path: 'entrega/progresso/:entrega_id', component: PlanoEntregaListProgressoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Progressos da entrega do Plano de Entregas", modal: true } },
  { path: 'entrega/progresso/:entrega_id/new', component: PlanoEntregaFormProgressoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Progresso entrega do Plano de Entregas", modal: true } },
  { path: 'entrega/progresso/:entrega_id/:id/edit', component: PlanoEntregaFormProgressoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Progresso entrega do Plano de Entregas", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoEntregaRoutingModule { }
