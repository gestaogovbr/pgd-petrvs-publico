import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoMotivoAfastamentoFormComponent } from './tipo-motivo-afastamento-form/tipo-motivo-afastamento-form.component';
import { TipoMotivoAfastamentoListComponent } from './tipo-motivo-afastamento-list/tipo-motivo-afastamento-list.component';

const routes: Routes = [
  { path: '', component: TipoMotivoAfastamentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Motivo de Afastamento" } },
  { path: 'new', component: TipoMotivoAfastamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Tipo de Motivo de Afastamento", modal: true } },
  { path: ':id/edit', component: TipoMotivoAfastamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Tipo de Motivo de Afastamento", modal: true } },
  { path: ':id/consult', component: TipoMotivoAfastamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Tipo de Motivo de Afastamento", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoMotivoAfastamentoRoutingModule { }
