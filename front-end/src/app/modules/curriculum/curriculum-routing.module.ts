import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';

import { RaioxhomeComponent } from 'src/app/modules/curriculum/curriculum-home/raioxhome.component';
import { CurriculumFormComponent } from 'src/app/modules/curriculum/curriculum-form/curriculum-form.component';
import { CurriculumProfissionalFormComponent } from 'src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component'
import { CurriculumAtributosbig5FormComponent } from './currriculum-atributos/curriculum-atributosbig5-form/curriculum-atributosbig5-form.component';
import { HomeComponent } from '../home/home.component';
import { CurrriculumAtributosComponent } from './currriculum-atributos/currriculum-atributos.component';
import { CurriculumAtributossoftFormComponent } from './currriculum-atributos/curriculum-atributossoft-form/curriculum-atributossoft-form.component';
import { CurriculumAtributosdiscFormComponent } from './currriculum-atributos/curriculum-atributosdisc-form/curriculum-atributosdisc-form.component';
import { CurriculumAtributosDassFormComponent } from './currriculum-atributos/curriculum-atributos-dass-form/curriculum-atributos-dass-form.component';
import { CurriculumAtributosQvtFormComponent } from './currriculum-atributos/curriculum-atributos-qvt-form/curriculum-atributos-qvt-form.component';

const routes: Routes = [
  //{ path: '', component: RaioxhomeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home Raio-X" } },
  { path: '', component: HomeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home Raio-X" } },
  //{ path: 'home', component: RaioxhomeComponent, canActivate: [AuthGuard], data: { title: "Home Raio-X" } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home Raio-X" } },
  { path: 'pessoal', component: CurriculumFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "" } },
  { path: 'profissional', component: CurriculumProfissionalFormComponent, canActivate: [AuthGuard], data: { title: "Dados Profissionais" } },
  { path: 'big5', component: CurriculumAtributosbig5FormComponent, canActivate: [AuthGuard], data: { title: "" } },
  { path: 'soft', component: CurriculumAtributossoftFormComponent, canActivate: [AuthGuard], data: { title: "" } },
  { path: 'atributos', component: CurrriculumAtributosComponent, canActivate: [AuthGuard], data: { title: "" } },
  { path: 'disc', component: CurriculumAtributosdiscFormComponent, canActivate: [AuthGuard], data: { title: "" } },
  { path: 'dass', component: CurriculumAtributosDassFormComponent, canActivate: [AuthGuard], data: { title: "" } },
  { path: 'dass', component: CurriculumAtributosQvtFormComponent, canActivate: [AuthGuard], data: { title: "" } },
  { path: 'cadastros',loadChildren: () => import('../cadastros/curriculum/curriculum-cadastros.module').then(m => m.CurriculumCadastrosModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CurriculumRoutingModule { }
