import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { CapacidadeFormComponent } from './capacidade-form/capacidade-form.component';
import { CapacidadeListComponent } from './capacidade-list/capacidade-list.component';

const routes: Routes = [
  { path: '', component: CapacidadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Capacidades" } },
  { path: 'new', component: CapacidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Capacidade", modal: true } },
  { path: ':id/edit', component: CapacidadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Capacidade", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacidadeRoutingModule { }
