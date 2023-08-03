import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PlanejamentoFormComponent } from './planejamento-form/planejamento-form.component';
import { PlanejamentoListComponent } from './planejamento-list/planejamento-list.component';
import { PlanejamentoFormObjetivoComponent } from './planejamento-form-objetivo/planejamento-form-objetivo.component';
import { PlanejamentoListObjetivosEntregasComponent } from './planejamento-list-objetivos-entregas/planejamento-list-objetivos-entregas.component';

const routes: Routes = [
  { path: '', component: PlanejamentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Planejamentos Institucionais" } },
  { path: 'new', component: PlanejamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Planejamento Institucional", modal: true } },
  { path: ':id/edit', component: PlanejamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Planejamento Institucional", modal: true } },
  { path: ':id/consult', component: PlanejamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Planejamento Institucional", modal: true } },
  { path: 'objetivo', component: PlanejamentoFormObjetivoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Objetivo de Planejamento Institucional", modal: true } },
  { path: 'objetivoList', component: PlanejamentoListObjetivosEntregasComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Objetivos de Planejamento Institucional", modal: true } },
  { path: 'objetivo/:id/consult', component: PlanejamentoFormObjetivoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Objetivo de Planejamento Institucional", modal: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanejamentoRoutingModule { }
