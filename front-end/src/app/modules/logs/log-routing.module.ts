import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { ChangeListComponent } from './change/change-list/change-list.component';
import { ErrorFormComponent } from './error/error-form/error-form.component';
import { ErrorListComponent } from './error/error-list/error-list.component';
import { EnvioListComponent } from './envios/envio-list/envio-list.component';
import { EnvioConsultComponent } from './envios/envio-consult/envio-consult.component';
import { EnvioItemConsultComponent } from './envios/envio-item-consult/envio-item-consult.component';
import { EnvioItemParticipanteListComponent } from './envios/envio-item-participante-list/envio-item-participante-list.component';
import { EnvioItemTrabalhoListComponent } from './envios/envio-item-trabalho-list/envio-item-trabalho-list.component';
import { EnvioItemEntregaListComponent } from './envios/envio-item-entrega-list/envio-item-entrega-list.component';

const routes: Routes = [
  { path: 'change', component: ChangeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Logs das Alterações" } },
  { path: 'change/:id/consult', component: ChangeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Log de Alteração", modal: true } },
  { path: 'error', component: ErrorListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Logs dos Erros" } },
  { path: 'error/:id/consult', component: ErrorFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Log de Erro", modal: true } },
  { path: 'envios', component: EnvioListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Histórico de Envios à API PGD" } },
  { path: 'envios/:id/consult', component: EnvioConsultComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Dados do Envio à API PGD", modal: true } },
  { path: 'envios/:id/participantes', component: EnvioItemParticipanteListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Histórico de Participantes enviados", modal: true } },
  { path: 'envios/:id/entregas', component: EnvioItemEntregaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Histórico de Planos de Entrega enviados", modal: true } },
  { path: 'envios/:id/trabalhos', component: EnvioItemTrabalhoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Histórico de Planos de Trabalho enviados", modal: true } },
  { path: 'envio-items/:id/consult', component: EnvioItemConsultComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Item enviado à API PGD", modal: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }

