import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { DisciplinaListComponent } from './disciplina-list/disciplina-list.component';
import { DisciplinaFormComponent } from './disciplina-form/disciplina-form.component';

const routes: Routes = [
  { path: '', component: DisciplinaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
  { path: 'new', component: DisciplinaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: DisciplinaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: DisciplinaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class DisciplinaRoutingModule { }
