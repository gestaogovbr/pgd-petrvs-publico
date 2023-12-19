import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { QuestionarioListComponent } from './questionario-pergunta/questionario-pergunta-list/questionario-list.component';
import { QuestionarioPerguntaFormComponent } from './questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component';
import { QuestionarioRespostaListComponent } from './questionario-resposta/questionario-resposta-list/questionario-resposta-list.component';
import { QuestionarioListPerguntaComponent } from './questionario-list-pergunta/questionario-list-pergunta.component';

const routes: Routes = [
    { path: '', component: QuestionarioListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
    { path: 'new', component: QuestionarioPerguntaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: false } },
    { path: ':id/edit', component: QuestionarioPerguntaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: QuestionarioPerguntaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: 'resposta/list', component: QuestionarioRespostaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: 'resposta/new', component: QuestionarioRespostaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: 'resposta/:id/edit', component: QuestionarioRespostaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: 'resposta/:id/consult', component: QuestionarioRespostaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: 'teste', component: QuestionarioListPerguntaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
 
})
export class QuestionarioRoutingModule { }
