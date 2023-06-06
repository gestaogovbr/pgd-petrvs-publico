import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';

import { AreaConhecimentoFormComponent } from './area-conhecimento-form/area-conhecimento-form.component';
import { AreaConhecimentoListComponent } from './area-conhecimento-list/area-conhecimento-list.component';
import { CursoFormComponent } from './curso-form/curso-form.component';
import { CursoListComponent } from './curso-list/curso-list.component';
import { TipoCursoFormComponent } from './tipo-curso-form/tipo-curso-form.component';
import { TipoCursoListComponent } from './tipo-curso-list/tipo-curso-list.component';
import { CentroTreinamentoFormComponent } from './centro-treinamento-form/centro-treinamento-form.component';
import { CentroTreinamentoListComponent } from './centro-treinamento-list/centro-treinamento-list.component'; 
import { FuncaoFormComponent } from './funcao-form/funcao-form.component';
import { FuncaoListComponent } from './funcao-list/funcao-list.component';
import { GrupoEspecializadoListComponent } from './grupo-especializado-list/grupo-especializado-list.component';
import { GrupoEspecializadoFormComponent } from './grupo-especializado-form/grupo-especializado-form.component';
import { MateriaListComponent } from './materia-list/materia-list.component';
import { MateriaFormComponent } from './materia-form/materia-form.component';


const routes: Routes = [
 
  { path: 'gerais/areaconhecimento', component: AreaConhecimentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'gerais/areaconhecimento/new', component: AreaConhecimentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'gerais/areaconhecimento/:id/edit', component: AreaConhecimentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'gerais/areaconhecimento/:id/consult', component: AreaConhecimentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'gerais/curso', component: CursoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'gerais/curso/new', component: CursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'gerais/curso/:id/edit', component: CursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'gerais/curso/:id/consult', component: CursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'gerais/tipocurso', component: TipoCursoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'gerais/tipocurso/new', component: TipoCursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'gerais/tipocurso/:id/edit', component: TipoCursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'gerais/tipocurso/:id/consult', component: TipoCursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'gerais/centrotreinamento', component: CentroTreinamentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'gerais/centrotreinamento/new', component: CentroTreinamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'gerais/centrotreinamento/:id/edit', component: CentroTreinamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'gerais/centrotreinamento/:id/consult', component: CentroTreinamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'gerais/funcao', component: FuncaoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'gerais/funcao/new', component: FuncaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'gerais/funcao/:id/edit', component: FuncaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'gerais/funcao/:id/consult', component: FuncaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'gerais/ge', component: GrupoEspecializadoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'gerais/ge/new', component: GrupoEspecializadoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'gerais/ge/:id/edit', component: GrupoEspecializadoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'gerais/ge/:id/consult', component: GrupoEspecializadoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'gerais/materia', component: MateriaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'gerais/materia/new', component: MateriaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'gerais/materia/:id/edit', component: MateriaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'gerais/materia/:id/consult', component: MateriaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CurriculumRoutingModule { }
