import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PlanejamentoFormComponent } from './planejamento-form/planejamento-form.component';
import { PlanejamentoListComponent } from './planejamento-list/planejamento-list.component';
import { PlanejamentoFormObjetivoComponent } from './planejamento-form-objetivo/planejamento-form-objetivo.component';
import { PlanejamentoListObjetivoComponent } from './planejamento-list-objetivo/planejamento-list-objetivo.component';
import { PlanejamentoMapaEntregasComponent } from './planejamento-mapa-entregas/planejamento-mapa-entregas.component';

const routes: Routes = [
  { path: '', component: PlanejamentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Planejamentos Institucionais" } },
  { path: 'new', component: PlanejamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: PlanejamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: PlanejamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  //{ path: 'objetivo', component: PlanejamentoListObjetivoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Objetivos do Planejamento", modal: true } },
  { path: 'objetivo', component: PlanejamentoFormObjetivoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Objetivo", modal: true } },
  //{ path: 'objetivo/:id/edit', component: PlanejamentoFormObjetivoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Objetivo", modal: true } },
 // { path: 'objetivo/:id/consult', component: PlanejamentoFormObjetivoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar Objetivo", modal: true } },
  { path: ':id/objetivos/:objetivo_id', component: PlanejamentoMapaEntregasComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Objetivos do planejamento", modal: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanejamentoRoutingModule { }
