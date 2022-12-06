import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { DemandaFormAvaliarComponent } from './demanda-form-avaliar/demanda-form-avaliar.component';
import { DemandaFormConcluirComponent } from './demanda-form-concluir/demanda-form-concluir.component';
import { DemandaFormEntregaComponent } from './demanda-form-entrega/demanda-form-entrega.component';
import { DemandaFormIniciarComponent } from './demanda-form-iniciar/demanda-form-iniciar.component';
import { DemandaFormPausarComponent } from './demanda-form-pausar/demanda-form-pausar.component';
import { DemandaFormProrrogarComponent } from './demanda-form-prorrogar/demanda-form-prorrogar.component';
import { DemandaFormComponent } from './demanda-form/demanda-form.component';
import { DemandaListEntregaComponent } from './demanda-list-entrega/demanda-list-entrega.component';
import { DemandaListGridComponent } from './demanda-list-grid/demanda-list-grid.component';
import { DemandaListComponent } from './demanda-list/demanda-list.component';

const routes: Routes = [
  { path: '', component: DemandaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Demandas" } },
  { path: 'grid', component: DemandaListGridComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Demandas" } },
  { path: 'new', component: DemandaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Inclusão", modal: true } },
  { path: 'entrega', component: DemandaFormEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Entrega da demanda", modal: true } },
  { path: 'entrega/concluir', component: DemandaListEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Concluir entrega", modal: true } },
  { path: 'entrega/:entrega_id/comentar', component: DemandaFormEntregaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Comentários", modal: true } },
  { path: ':id/edit', component: DemandaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: DemandaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Consultar", modal: true } },
  { path: ':id/clonar', component: DemandaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Clonar", modal: true } },
  { path: ':id/iniciar', component: DemandaFormIniciarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Iniciar", modal: true } },
  { path: ':id/concluir', component: DemandaFormConcluirComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Concluir", modal: true } },
  { path: ':id/avaliar', component: DemandaFormAvaliarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Avaliar", modal: true } },
  { path: ':id/pausar', component: DemandaFormPausarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Suspender", modal: true } },
  { path: ':id/prorrogar', component: DemandaFormProrrogarComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Prorrogar", modal: true } },
  { path: ':id/comentar', component: DemandaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Comentários", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandaRoutingModule { }
