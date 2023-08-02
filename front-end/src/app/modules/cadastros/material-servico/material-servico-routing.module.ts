import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { MaterialServicoFormComponent } from './material-servico-form/material-servico-form.component';
import { MaterialServicoListComponent } from './material-servico-list/material-servico-list.component';

const routes: Routes = [
  { path: '', component: MaterialServicoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Materiais e Serviços" } },
  { path: 'new', component: MaterialServicoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Material e Serviço", modal: true } },
  { path: ':id/edit', component: MaterialServicoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Material e Serviço", modal: true } },
  { path: ':id/consult', component: MaterialServicoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Material e Serviço", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialServicoRoutingModule { }
