import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PlanejamentoObjetivoFormComponent } from './planejamento-objetivo-form/planejamento-objetivo-form.component';
import { PlanejamentoObjetivoListComponent } from './planejamento-objetivo-list/planejamento-objetivo-list.component';

const routes: Routes = [
  { path: '', component: PlanejamentoObjetivoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entrega" } },
  { path: 'new', component: PlanejamentoObjetivoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: PlanejamentoObjetivoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: PlanejamentoObjetivoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanejamentoObjetivoRoutingModule { }
