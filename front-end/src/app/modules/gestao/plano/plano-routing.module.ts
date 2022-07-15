import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PlanoFormTermoComponent } from './plano-form-termo/plano-form-termo.component';
import { PlanoFormComponent } from './plano-form/plano-form.component';
import { PlanoListComponent } from './plano-list/plano-list.component';

const routes: Routes = [
  { path: '', component: PlanoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Plano" } },
  { path: 'new', component: PlanoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'termo', component: PlanoFormTermoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Termo de adesão", modal: true } },
  { path: ':id/edit', component: PlanoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: PlanoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: ':id/termos', component: PlanoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Termos de adesão", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoRoutingModule { }
