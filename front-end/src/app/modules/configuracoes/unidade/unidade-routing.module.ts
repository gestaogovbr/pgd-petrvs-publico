import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { UnidadeFormComponent } from './unidade-form/unidade-form.component';
import { UnidadeListComponent } from './unidade-list/unidade-list.component';
import { UnidadeMergeComponent } from './unidade-merge/unidade-merge.component';
import { UnidadeIntegranteComponent } from './unidade-integrante/unidade-integrante.component';

const routes: Routes = [
  { path: '', component: UnidadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Unidades" } },
  { path: 'new', component: UnidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Unidade", modal: true } },
  { path: ':id/edit', component: UnidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Unidade", modal: true } },
  { path: ':id/consult', component: UnidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Unidade", modal: true } },
  { path: ':id/:idUnidade/integrante', component: UnidadeIntegranteComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Integrantes da Unidade", modal: true } },
  { path: ':id/subordinadas', component: UnidadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Unidades subordinadas" } },
  { path: 'merge', component: UnidadeMergeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Unificação", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
