import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { CurriculumFormComponent } from 'src/app/modules/curriculum/curriculum-form/curriculum-form.component';
import { CurriculumProfissionalFormComponent } from 'src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component'
import { CurriculumAtributosBig5FormComponent } from './curriculum-atributos/curriculum-atributos-big5-form/curriculum-atributos-big5-form.component';
import { HomeComponent } from '../home/home.component';
import { CurriculumAtributosComponent } from './curriculum-atributos/curriculum-atributos.component';
import { CurriculumAtributosSoftFormComponent } from './curriculum-atributos/curriculum-atributos-soft-form/curriculum-atributos-soft-form.component';
import { CurriculumAtributosDiscFormComponent } from './curriculum-atributos/curriculum-atributos-disc-form/curriculum-atributos-disc-form.component';
import { CurriculumAtributosDassFormComponent } from './curriculum-atributos/curriculum-atributos-dass-form/curriculum-atributos-dass-form.component';
import { CurriculumAtributosQvtFormComponent } from './curriculum-atributos/curriculum-atributos-qvt-form/curriculum-atributos-qvt-form.component';
import { CurriculumPesquisaListComponent } from './curriculum-pesquisa-list/curriculum-pesquisa-list.component';
import { CurriculumPesquisaListUsuarioComponent } from './curriculum-pesquisa-list-usuario/curriculum-pesquisa-list-usuario.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home Raio-X" } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home Raio-X" } },
  { path: 'pessoal', component: CurriculumFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Dados Pessoais", modal: true } },
  { path: 'profissional', component: CurriculumProfissionalFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Dados Profissionais", modal: true } },
  { path: 'big5', component: CurriculumAtributosBig5FormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Big5" } },
  { path: 'soft', component: CurriculumAtributosSoftFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Soft" } },
  { path: 'atributos', component: CurriculumAtributosComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Atributos Comportamentais2", modal: false, modalWidth: 1300 } },
  { path: 'disc', component: CurriculumAtributosDiscFormComponent, canActivate: [AuthGuard], data: { title: "Disc" } },
  { path: 'dass', component: CurriculumAtributosDassFormComponent, canActivate: [AuthGuard], data: { title: "Dass" } },
  { path: 'qvt', component: CurriculumAtributosQvtFormComponent, canActivate: [AuthGuard], data: { title: "QVT" } },
  //{ path: 'pesquisa-usuario', component: CurriculumPesquisaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Pesquisa Usuário" } },
  { path: 'pesquisa-adm', component: CurriculumPesquisaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Pesquisa Administrativa" } },
  { path: 'detalhe-pesquisa', component: CurriculumPesquisaListUsuarioComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Currículo", modal: true } },
  { path: 'cadastros/area-atividade-externa', loadChildren: () => import('./cadastros/area-atividade-externa/area-atividade-externa.module').then(m => m.AreaAtividadeExternaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/area-conhecimento', loadChildren: () => import('./cadastros/area-conhecimento/area-conhecimento.module').then(m => m.AreaConhecimentoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/curso', loadChildren: () => import('./cadastros/curso/curso.module').then(m => m.CursoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-curso', loadChildren: () => import('./cadastros/tipo-curso/tipo-curso.module').then(m => m.TipoCursoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/centro-treinamento', loadChildren: () => import('./cadastros/centro-treinamento/centro-treinamento.module').then(m => m.CentroTreinamentoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/funcao', loadChildren: () => import('./cadastros/funcao/funcao.module').then(m => m.FuncaoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/grupo-especializado', loadChildren: () => import('./cadastros/grupo-especializado/grupo-especializado.module').then(m => m.GrupoEspecializadoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/materia', loadChildren: () => import('./cadastros/materia/materia.module').then(m => m.MateriaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/cargo', loadChildren: () => import('./cadastros/cargo/cargo.module').then(m => m.CargoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/funcao', loadChildren: () => import('./cadastros/funcao/funcao.module').then(m => m.FuncaoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/area-tematica', loadChildren: () => import('./cadastros/area-tematica/area-tematica.module').then(m => m.AreaTematicaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/capacidade-tecnica', loadChildren: () => import('./cadastros/capacidade-tecnica/capacidade-tecnica.module').then(m => m.CapacidadeTecnicaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/questionario', loadChildren: () => import('./cadastros/questionario/questionario.module').then(m => m.QuestionarioModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }
