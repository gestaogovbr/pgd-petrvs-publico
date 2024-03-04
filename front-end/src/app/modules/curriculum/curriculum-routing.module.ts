import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';

import { RaioxhomeComponent } from 'src/app/modules/curriculum/curriculum-home/raioxhome.component';
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
  { path: 'pessoal', component: CurriculumFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "" } },
  { path: 'profissional', component: CurriculumProfissionalFormComponent, canActivate: [AuthGuard], data: { title: "Dados Profissionais" } },
  { path: 'big5', component: CurriculumAtributosBig5FormComponent, canActivate: [AuthGuard], data: { title: "Big5" } },
  { path: 'soft', component: CurriculumAtributosSoftFormComponent, canActivate: [AuthGuard], data: { title: "Soft" } },
  { path: 'atributos', component: CurriculumAtributosComponent, canActivate: [AuthGuard], data: { title: "Atributos Comportamentais" } },
  { path: 'disc', component: CurriculumAtributosDiscFormComponent, canActivate: [AuthGuard], data: { title: "Disc" } },
  { path: 'dass', component: CurriculumAtributosDassFormComponent, canActivate: [AuthGuard], data: { title: "Dass" } },
  { path: 'qvt', component: CurriculumAtributosQvtFormComponent, canActivate: [AuthGuard], data: { title: "QVT" } },
  //{ path: 'pesquisa-usuario', component: CurriculumPesquisaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Pesquisa Usuário" } },
  { path: 'pesquisa-adm', component: CurriculumPesquisaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Pesquisa Administrativa" } },
  { path: 'detalhe-pesquisa', component: CurriculumPesquisaListUsuarioComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Currículo", modal: true}},
  { path: 'cadastros',loadChildren: () => import('../cadastros/curriculum/curriculum-cadastros.module').then(m => m.CurriculumCadastrosModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CurriculumRoutingModule { }
