import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoCapacidadeFormComponent } from './tipo-capacidade-form/tipo-capacidade-form.component';
import { TipoCapacidadeListComponent } from './tipo-capacidade-list/tipo-capacidade-list.component';

const routes: Routes = [
  { path: '', component: TipoCapacidadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Capacidade" } },
  { path: 'new', component: TipoCapacidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: TipoCapacidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: TipoCapacidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoCapacidadeRoutingModule { }
