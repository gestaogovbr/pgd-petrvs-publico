import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PanelListComponent } from './panel-list/panel-list.component';
import { PanelFormComponent } from './panel-form/panel-form.component';
import { PanelListLogsComponent } from './panel-list-logs/panel-list-logs.component';
import { PanelSeederComponent } from './panel-seeder/panel-seeder.component';

const routes: Routes = [
  { path: '', component: PanelListComponent, runGuardsAndResolvers: 'always', data: { title: "Painéis" } },
  { path: 'new', component: PanelFormComponent, resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Painel", modal: true } },
  { path: ':id/edit', component: PanelFormComponent, resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Painel", modal: true } },
  { path: ':id/consult', component: PanelFormComponent, resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Painel", modal: true } },
  { path: ':id/logs', component: PanelListLogsComponent, resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Logs", modal: true } },
  { path: ':id/seeder', component: PanelSeederComponent, resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Executa Seeder no Tenant", modal: true } },
  { path: 'logs2', component: PanelListLogsComponent, resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Logs", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
