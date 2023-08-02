import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoModalidadeFormComponent } from './tipo-modalidade-form/tipo-modalidade-form.component';
import { TipoModalidadeListComponent } from './tipo-modalidade-list/tipo-modalidade-list.component';

const routes: Routes = [
  { path: '', component: TipoModalidadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Modalidade" } },
  { path: 'new', component: TipoModalidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Tipo de Modalidade", modal: true } },
  { path: ':id/edit', component: TipoModalidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Tipo de Modalidade", modal: true } },
  { path: ':id/consult', component: TipoModalidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Tipo de Modalidade", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoModalidadeRoutingModule { }
