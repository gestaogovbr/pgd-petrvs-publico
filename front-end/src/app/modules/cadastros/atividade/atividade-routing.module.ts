import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { AtividadeFormComponent } from './atividade-form/atividade-form.component';
import { AtividadeListComponent } from './atividade-list/atividade-list.component';

const routes: Routes = [
  { path: '', component: AtividadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Atividade" } },
  { path: 'new', component: AtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: AtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: AtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Consultar", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadeRoutingModule { }
