import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { AreaConhecimentoFormComponent } from './area-conhecimento/area-conhecimento-form/area-conhecimento-form.component';
import { AreaConhecimentoListComponent } from './area-conhecimento/area-conhecimento-list/area-conhecimento-list.component';
import { CursoFormComponent } from './curso/curso-form/curso-form.component';
import { CursoListComponent } from './curso/curso-list/curso-list.component';
import { TipoCursoFormComponent } from './tipo-curso/tipo-curso-form/tipo-curso-form.component';
import { TipoCursoListComponent } from './tipo-curso/tipo-curso-list/tipo-curso-list.component';
import { CentroTreinamentoFormComponent } from './centro-treinamento/centro-treinamento-form/centro-treinamento-form.component';
import { CentroTreinamentoListComponent } from './centro-treinamento/centro-treinamento-list/centro-treinamento-list.component'; 
import { FuncaoFormComponent } from './funcao/funcao-form/funcao-form.component';
import { FuncaoListComponent } from './funcao/funcao-list/funcao-list.component';
import { GrupoEspecializadoListComponent } from './grupo-especializado/grupo-especializado-list/grupo-especializado-list.component';
import { GrupoEspecializadoFormComponent } from './grupo-especializado/grupo-especializado-form/grupo-especializado-form.component';
import { MateriaListComponent } from './materia/materia-list/materia-list.component';
import { MateriaFormComponent } from './materia/materia-form/materia-form.component';
import { CargoListComponent } from './cargo/cargo-list/cargo-list.component';
import { CargoFormComponent } from './cargo/cargo-form/cargo-form.component';
import { AreaAtividadeExternaFormComponent } from './area-atividade-externa/area-atividade-externa-form/area-atividade-externa-form.component';
import { AreaAtividadeExternaListComponent } from './area-atividade-externa/area-atividade-externa-list/area-atividade-externa-list.component';
import { AreaTematicaListComponent } from './area-tematica/area-tematica-list/area-tematica-list.component';
import { AreaTematicaFormComponent } from './area-tematica/area-tematica-form/area-tematica-form.component';
import { CapacidadeTecnicaFormComponent } from './capacidade-tecnica/capacidade-tecnica-form/capacidade-tecnica-form.component';
import { CapacidadeTecnicaListComponent } from './capacidade-tecnica/capacidade-tecnica-list/capacidade-tecnica-list.component';
import { QuestionarioPerguntaListComponent } from './questionario/questionario-pergunta/questionario-pergunta-list/questionario-pergunta-list.component';
import { QuestionarioPerguntaFormComponent } from './questionario/questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component';
import { QuestionarioRespostaListComponent } from './questionario/questionario-resposta/questionario-resposta-list/questionario-resposta-list.component';

const routes: Routes = [
  
  { path: 'areaconhecimento', component: AreaConhecimentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'areaconhecimento/new', component: AreaConhecimentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'areaconhecimento/:id/edit', component: AreaConhecimentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'areaconhecimento/:id/consult', component: AreaConhecimentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'curso', component: CursoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'curso/new', component: CursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'curso/:id/edit', component: CursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'curso/:id/consult', component: CursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'tipocurso', component: TipoCursoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'tipocurso/new', component: TipoCursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'tipocurso/:id/edit', component: TipoCursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'tipocurso/:id/consult', component: TipoCursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'centrotreinamento', component: CentroTreinamentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'centrotreinamento/new', component: CentroTreinamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'centrotreinamento/:id/edit', component: CentroTreinamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'centrotreinamento/:id/consult', component: CentroTreinamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'funcao', component: FuncaoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'funcao/new', component: FuncaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'funcao/:id/edit', component: FuncaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'funcao/:id/consult', component: FuncaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'ge', component: GrupoEspecializadoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'ge/new', component: GrupoEspecializadoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'ge/:id/edit', component: GrupoEspecializadoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'ge/:id/consult', component: GrupoEspecializadoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'materia', component: MateriaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'materia/new', component: MateriaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'materia/:id/edit', component: MateriaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'materia/:id/consult', component: MateriaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'cargo', component: CargoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'cargo/new', component: CargoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'cargo/:id/edit', component: CargoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'cargo/:id/consult', component: CargoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'funcao', component: FuncaoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'funcao/new', component: FuncaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'funcao/:id/edit', component: FuncaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'funcao/:id/consult', component: FuncaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  
  { path: 'areaatividadeexterna',loadChildren: () => import('./area-atividade-externa/area-atividade-externa.module').then(m => m.AreaAtividadeExternaModule), canActivate: [AuthGuard] },
  //{ path: 'areaatividadeexterna', component: AreaAtividadeExternaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  //{ path: 'areaatividadeexterna/new', component: AreaAtividadeExternaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  //{ path: 'areaatividadeexterna/:id/edit', component: AreaAtividadeExternaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  //{ path: 'areaatividadeexterna/:id/consult', component: AreaAtividadeExternaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  
  
  { path: 'areatematica', component: AreaTematicaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'areatematica/new', component: AreaTematicaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'areatematica/:id/edit', component: AreaTematicaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'areatematica/:id/consult', component: AreaTematicaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'capacidadetecnica', component: CapacidadeTecnicaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'capacidadetecnica/new', component: CapacidadeTecnicaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'capacidadetecnica/:id/edit', component: CapacidadeTecnicaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'capacidadetecnica/:id/consult', component: CapacidadeTecnicaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'questionariopergunta', component: QuestionarioPerguntaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'questionariopergunta/new', component: QuestionarioPerguntaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'questionariopergunta/:id/edit', component: QuestionarioPerguntaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'questionariopergunta/:id/consult', component: QuestionarioPerguntaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'questionarioresposta', component: QuestionarioRespostaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'questionarioresposta/new', component: QuestionarioPerguntaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'questionarioresposta/:id/edit', component: QuestionarioPerguntaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'questionarioresposta/:id/consult', component: QuestionarioPerguntaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CurriculumRoutingModule { }
