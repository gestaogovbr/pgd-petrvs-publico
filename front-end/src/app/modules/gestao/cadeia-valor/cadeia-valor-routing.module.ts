import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../../guards/auth.guard";
import {ConfigResolver} from "../../../resolvies/config.resolver";
import {CadeiaValorListComponent} from "./cadeia-valor-list/cadeia-valor-list.component";
import {CadeiaValorFormComponent} from "./cadeia-valor-form/cadeia-valor-form.component";
import {CadeiaValorListGridComponent} from "./cadeia-valor-list-grid/cadeia-valor-list-grid.component";
import { CadeiaValorListProcessosComponent } from './cadeia-valor-list-processos/cadeia-valor-list-processos.component';
import { CadeiaValorListProcessosEntregasComponent } from './cadeia-valor-list-processos-entregas/cadeia-valor-list-processos-entregas.component';

const routes: Routes = [
  { path: '', component: CadeiaValorListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Cadeia de Valor" } },
  { path: 'grid', component: CadeiaValorListGridComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Cadeia de Valor" } },
  { path: 'new', component: CadeiaValorFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Cadeia de Valor", modal: true } },
  { path: ':id/edit', component: CadeiaValorFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Cadeia de Valor", modal: true } },
  { path: ':id/consult', component: CadeiaValorFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Cadeia de Valor", modal: true } },
  { path: 'processoList', component: CadeiaValorListProcessosEntregasComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista de Processos da Cadeia de Valor", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadeiaValorRoutingModule { }
