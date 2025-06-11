import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { ProgramaFormComponent } from './programa-form/programa-form.component';
import { ProgramaListComponent } from './programa-list/programa-list.component';
import { ProgramaParticipantesComponent } from './programa-participantes/programa-participantes.component';
import { PedagioFormComponent } from './pedagio-form/pedagio-form.component';

const routes: Routes = [
  { path: '', component: ProgramaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Programas" } },
  { path: 'new', component: ProgramaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Programa", modal: true } },
  { path: 'participantes', component: ProgramaParticipantesComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Participantes do Programa" } },
  { path: ':id/edit', component: ProgramaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Programa", modal: true } },
  { path: ':id/consult', component: ProgramaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Programa", modal: true } },
  { path: ':id/participantes', component: ProgramaParticipantesComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Participantes do Programa", modal: true } },
  { path: 'pedagio/:idUsuario', component: PedagioFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tornar a modalidade teletrabalho indisponível para o agente público", modal: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaRoutingModule { }
