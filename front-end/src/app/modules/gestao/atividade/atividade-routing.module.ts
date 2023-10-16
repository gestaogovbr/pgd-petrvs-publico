import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { AtividadeFormConcluirComponent } from './atividade-form-concluir/atividade-form-concluir.component';
import { AtividadeFormTarefaComponent } from './atividade-form-tarefa/atividade-form-tarefa.component';
import { AtividadeFormIniciarComponent } from './atividade-form-iniciar/atividade-form-iniciar.component';
import { AtividadeFormPausarComponent } from './atividade-form-pausar/atividade-form-pausar.component';
import { AtividadeFormProrrogarComponent } from './atividade-form-prorrogar/atividade-form-prorrogar.component';
import { AtividadeFormComponent } from './atividade-form/atividade-form.component';
import { AtividadeListTarefaComponent } from './atividade-list-tarefa/atividade-list-tarefa.component';
import { AtividadeListGridComponent } from './atividade-list-grid/atividade-list-grid.component';
import { AtividadeListComponent } from './atividade-list/atividade-list.component';
import { AtividadeHierarquiaComponent } from './atividade-hierarquia/atividade-hierarquia.component';

const routes: Routes = [
  { path: '', component: AtividadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Atividades" } },
  { path: 'grid', component: AtividadeListGridComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Atividades" } },
  { path: 'new', component: AtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Inclusão de Atividade", modal: true } },
  { path: 'tarefa', component: AtividadeFormTarefaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Tarefa da Atividade", modal: true } },
  { path: 'tarefa/concluir', component: AtividadeListTarefaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Concluir Tarefa", modal: true } },
  { path: 'tarefa/:tarefa_id/comentar', component: AtividadeFormTarefaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Comentários", modal: true } },
  { path: ':id/edit', component: AtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Edição da Atividade", modal: true } },
  { path: ':id/consult', component: AtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Consulta a Atividade", modal: true } },
  { path: ':id/clonar', component: AtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Clone de Atividade", modal: true } },
  { path: ':id/iniciar', component: AtividadeFormIniciarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Início de Atividade", modal: true } },
  { path: ':id/concluir', component: AtividadeFormConcluirComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Conclusão de Atividade", modal: true } },
  { path: ':id/pausar', component: AtividadeFormPausarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Suspensão de Atividade", modal: true } },
  { path: ':id/prorrogar', component: AtividadeFormProrrogarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Prorrogação de Atividade", modal: true } },
  { path: ':id/comentar', component: AtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Comentários de Atividade", modal: true } },
  { path: ':id/hierarquia', component: AtividadeHierarquiaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Hierarquia da Atividade", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadeRoutingModule { }
