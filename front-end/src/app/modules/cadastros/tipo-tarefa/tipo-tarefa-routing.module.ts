import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoTarefaFormComponent } from './tipo-tarefa-form/tipo-tarefa-form.component';
import { TipoTarefaListComponent } from './tipo-tarefa-list/tipo-tarefa-list.component';

const routes: Routes = [
  { path: '', component: TipoTarefaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Tarefa" } },
  { path: 'new', component: TipoTarefaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Tipo de Tarefa", modal: true } },
  { path: ':id/edit', component: TipoTarefaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Tipo de Tarefa", modal: true } },
  { path: ':id/consult', component: TipoTarefaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Tipo de Tarefa", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoTarefaRoutingModule { }
