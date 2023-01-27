import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../../guards/auth.guard";
import {ConfigResolver} from "../../../resolvies/config.resolver";
import {MacroprocessoListComponent} from "./macroprocesso-list/macroprocesso-list.component";
import {MacroprocessoFormComponent} from "./macroprocesso-form/macroprocesso-form.component";

const routes: Routes = [
  { path: '', component: MacroprocessoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Macroprocessos" } },
  { path: 'new', component: MacroprocessoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: ':id/edit', component: MacroprocessoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: MacroprocessoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MacroprocessoRoutingModule { }
