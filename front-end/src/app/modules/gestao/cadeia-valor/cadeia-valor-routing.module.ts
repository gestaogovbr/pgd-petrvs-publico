import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../../guards/auth.guard";
import {ConfigResolver} from "../../../resolvies/config.resolver";
import {CadeiaValorListComponent} from "./cadeia-valor-list/cadeia-valor-list.component";
import {CadeiaValorFormComponent} from "./cadeia-valor-form/cadeia-valor-form.component";
import {CadeiaValorListGridComponent} from "./cadeia-valor-list-grid/cadeia-valor-list-grid.component";

const routes: Routes = [
  { path: '', component: CadeiaValorListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Cadeia de Valor" } },
  { path: 'grid', component: CadeiaValorListGridComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Cadeia de Valor" } },
  { path: 'new', component: CadeiaValorFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: CadeiaValorFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: CadeiaValorFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadeiaValorRoutingModule { }
