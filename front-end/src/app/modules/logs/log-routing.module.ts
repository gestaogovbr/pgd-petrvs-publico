import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { ChangeFormComponent } from './change/change-form/change-form.component';
import { ChangeListComponent } from './change/change-list/change-list.component';
import { ErrorFormComponent } from './error/error-form/error-form.component';
import { ErrorListComponent } from './error/error-list/error-list.component';
import { EnvioListComponent } from './envios/envio-list/envio-list.component';

const routes: Routes = [
  { path: 'change', component: ChangeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Logs das Alterações" } },
  { path: 'change/:id/consult', component: ChangeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Log de Alteração", modal: true } },
  { path: 'error', component: ErrorListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Logs dos Erros" } },
  { path: 'error/:id/consult', component: ErrorFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Log de Erro", modal: true } },
  { path: 'envios', component: EnvioListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Log de Envios à API PGD" } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }

