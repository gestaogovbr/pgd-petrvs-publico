import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoClienteFormComponent } from './tipo-cliente-form/tipo-cliente-form.component';
import { TipoClienteListComponent } from './tipo-cliente-list/tipo-cliente-list.component';

const routes: Routes = [
  { path: '', component: TipoClienteListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Capacidade" } },
  { path: 'new', component: TipoClienteFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Capacidade", modal: true } },
  { path: ':id/edit', component: TipoClienteFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Capacidade", modal: true } },
  { path: ':id/consult', component: TipoClienteFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Capacidade", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoClienteRoutingModule { }
