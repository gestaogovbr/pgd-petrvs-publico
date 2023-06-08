import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PlanoEntregaListComponent } from './plano-entrega-list/plano-entrega-list.component';
import { PlanoEntregaFormComponent } from './plano-entrega-form/plano-entrega-form.component';
import { PlanoEntregaMapaEntregasComponent } from './plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component';
import { PlanoEntregaAdesaoComponent } from './plano-entrega-adesao/plano-entrega-adesao.component';
import { PlanoEntregaFormEntregaComponent } from './plano-entrega-form-entrega/plano-entrega-form-entrega.component';

const routes: Routes = [
  { path: '', component: PlanoEntregaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Plano de Entrega" } },
  { path: 'new', component: PlanoEntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: PlanoEntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: PlanoEntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'entrega', component: PlanoEntregaFormEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas do Plano de Entrega", modal:true }},
  { path: 'entrega/objetivos/:objetivo_id', component: PlanoEntregaMapaEntregasComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas", modal: true } },
  { path: 'entrega/processos/:processo_id', component: PlanoEntregaMapaEntregasComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas", modal: true } },
  { path: 'adesao', component: PlanoEntregaAdesaoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Adesão", modal: true } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoEntregaRoutingModule { }
