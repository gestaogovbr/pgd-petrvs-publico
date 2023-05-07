import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';

import { RaioxhomeComponent } from 'src/app/modules/curriculum/curriculum-home/raioxhome.component';
import { RaioxPessoalFormComponent } from 'src/app/modules/curriculum/curriculum-pessoal-form/raiox-pessoal-form.component';
import { CurriculumProfissionalFormComponent } from 'src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component'
import { AreaConhecimentoFormComponent } from '../cadastros/curriculum-cadastros/area-conhecimento-form/area-conhecimento-form.component';
import { AreaConhecimentoListComponent } from '../cadastros/curriculum-cadastros/area-conhecimento-list/area-conhecimento-list.component';


const routes: Routes = [
  { path: '', component: RaioxhomeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home Raio-X" } },
  { path: 'home', component: RaioxhomeComponent, canActivate: [AuthGuard], data: { title: "Home Raio-X" } },
  { path: 'pessoal', component: RaioxPessoalFormComponent, canActivate: [AuthGuard], data: { title: "Dados Pessoais" } },
  { path: 'profissional', component: CurriculumProfissionalFormComponent, canActivate: [AuthGuard], data: { title: "Dados Profissionais" } },
  
  { path: 'cadastros/areaconhecimento', component: AreaConhecimentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'cadastros/areaconhecimento/new', component: AreaConhecimentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'cadastros/areaconhecimento/:id/edit', component: AreaConhecimentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: 'cadastros/areaconhecimento/:id/consult', component: AreaConhecimentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CurriculumRoutingModule { }
