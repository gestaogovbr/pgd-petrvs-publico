import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PlanoTrabalhoFormTermoComponent } from './plano-trabalho-form-termo/plano-trabalho-form-termo.component';
import { PlanoTrabalhoFormComponent } from './plano-trabalho-form/plano-trabalho-form.component';
import { PlanoTrabalhoListComponent } from './plano-trabalho-list/plano-trabalho-list.component';
import { PlanoTrabalhoListEntregaComponent } from './plano-trabalho-list-entrega/plano-trabalho-list-entrega.component';

const routes: Routes = [
  { path: '', component: PlanoTrabalhoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Plano de Trabalho" } },
  { path: 'new', component: PlanoTrabalhoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'termo', component: PlanoTrabalhoFormTermoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Termo de adesão", modal: true } },
  { path: ':id/edit', component: PlanoTrabalhoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: PlanoTrabalhoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: 'entregaList', component: PlanoTrabalhoListEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista de Entregas", modal: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoTrabalhoRoutingModule { }
