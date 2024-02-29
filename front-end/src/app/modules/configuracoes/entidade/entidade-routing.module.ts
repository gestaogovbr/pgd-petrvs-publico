import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { EntidadeConfComponent } from './entidade-conf/entidade-conf.component';
import { EntidadeFormComponent } from './entidade-form/entidade-form.component';
import { EntidadeListComponent } from './entidade-list/entidade-list.component';

const routes: Routes = [
  { path: '', component: EntidadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entidades" } },
  { path: 'new', component: EntidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Entidade", modal: true } },
  { path: ':id/edit', component: EntidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Entidade", modal: true } },
  { path: ':id/conf', component: EntidadeConfComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Configurações de Entidade", modal: true } },
  { path: ':id/consult', component: EntidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Entidade", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadeRoutingModule { }
