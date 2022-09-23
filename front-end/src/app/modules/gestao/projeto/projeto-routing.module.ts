import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetoPlanejamentoComponent } from './projeto-planejamento/projeto-planejamento.component';

const routes: Routes = [
  { path: '', component: ProjetoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Projeto" } },
  { path: 'new', component: ProjetoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: ProjetoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: ProjetoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: ':id/planejamento', component: ProjetoPlanejamentoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Planejamento", modal: true } },
  { path: ':id/comentar', component: ProjetoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Comentar", modal: true } },
  { path: ':id/clonar', component: ProjetoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Clonar", modal: true } },
  { path: ':id/recurso', component: ProjetoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Recurso", modal: true } },
  { path: ':id/regra', component: ProjetoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Regra", modal: true } },
  { path: ':id/alocacao', component: ProjetoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Alocação", modal: true } },
  { path: ':id/envolvido', component: ProjetoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Envolvido", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }
