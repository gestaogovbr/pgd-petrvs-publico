import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PlanoEntregaListComponent } from './plano-entrega-list/plano-entrega-list.component';
import { PlanoEntregaFormComponent } from './plano-entrega-form/plano-entrega-form.component';
import { PlanoEntregaListPontoControleComponent } from './plano-entrega-list-ponto-controle/plano-entrega-list-ponto-controle.component';
import { PlanoEntregaFormPontoControleAvaliarComponent } from './plano-entrega-form-ponto-controle-avaliar/plano-entrega-form-ponto-controle-avaliar.component';
import { PlanoEntregaPontoControleFormEntregaComponent } from './plano-entrega-ponto-controle-form-entrega/plano-entrega-ponto-controle-form-entrega.component';
import { PlanoEntregaListEntregaComponent } from './plano-entrega-list-entrega/plano-entrega-list-entrega.component';

const routes: Routes = [
  { path: '', component: PlanoEntregaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Plano de Entrega" } },
  { path: 'new', component: PlanoEntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: PlanoEntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: PlanoEntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: ':id/ponto-controle', component: PlanoEntregaListPontoControleComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Pontos de Controle do Plano de Entrega" } },
  { path: 'entrega', component: PlanoEntregaListEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas do Plano de Entrega" } },
  { path: 'ponto-controle/:id/avaliar', component: PlanoEntregaFormPontoControleAvaliarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Avaliar Ponto de Controle" } },
  { path: 'ponto-controle/entrega', component: PlanoEntregaPontoControleFormEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas do Ponto de Controle" } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoEntregaRoutingModule { }
