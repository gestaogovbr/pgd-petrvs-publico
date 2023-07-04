import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';

import { RaioxhomeComponent } from 'src/app/modules/curriculum/curriculum-home/raioxhome.component';
import { CurriculumFormComponent } from 'src/app/modules/curriculum/curriculum-form/curriculum-form.component';
import { CurriculumProfissionalFormComponent } from 'src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component'
import { CurriculumAtributosbig5FormComponent } from './curriculum-atributosbig5-form/curriculum-atributosbig5-form.component';

const routes: Routes = [
  { path: '', component: RaioxhomeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home Raio-X" } },
  { path: 'home', component: RaioxhomeComponent, canActivate: [AuthGuard], data: { title: "Home Raio-X" } },
  { path: 'pessoal', component: CurriculumFormComponent, canActivate: [AuthGuard], data: { title: "" } },
  { path: 'profissional', component: CurriculumProfissionalFormComponent, canActivate: [AuthGuard], data: { title: "Dados Profissionais" } },
  { path: 'big5', component: CurriculumAtributosbig5FormComponent, canActivate: [AuthGuard], data: { title: "Teste BIG 5" } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CurriculumRoutingModule { }
