import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { ChangeFormComponent } from './change-form/change-form.component';
import { ChangeListComponent } from './change-list/change-list.component';

const routes: Routes = [
  { path: '', component: ChangeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Log - Alterações de Registro" } },
  { path: ':id/edit', component: ChangeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: ChangeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeRoutingModule { }
