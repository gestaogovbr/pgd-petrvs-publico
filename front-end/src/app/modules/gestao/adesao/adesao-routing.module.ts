import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../../guards/auth.guard";
import {ConfigResolver} from "../../../resolvies/config.resolver";
import {AdesaoListComponent} from "./adesao-list/adesao-list.component";
import {AdesaoFormComponent} from "./adesao-form/adesao-form.component";
import {AdesaoFormTermoComponent} from "./adesao-form-termo/adesao-form-termo.component";

const routes: Routes = [
  { path: '', component: AdesaoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Adesão" } },
  { path: 'new', component: AdesaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
  { path: 'termo', component: AdesaoFormTermoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Termo de Ciência e Reponsabilidade", modal: true } },
  { path: ':id/edit', component: AdesaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
  { path: ':id/consult', component: AdesaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
  { path: ':id/termos', component: AdesaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Termos de Ciência e Reponsabilidade", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdesaoRoutingModule { }
