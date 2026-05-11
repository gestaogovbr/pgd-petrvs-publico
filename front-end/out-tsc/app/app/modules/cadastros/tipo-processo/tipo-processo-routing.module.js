import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoProcessoFormComponent } from './tipo-processo-form/tipo-processo-form.component';
import { TipoProcessoListComponent } from './tipo-processo-list/tipo-processo-list.component';
const routes = [
    { path: '', component: TipoProcessoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Processo" } },
    { path: 'new', component: TipoProcessoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Tipo de Processo", modal: true } },
    { path: ':id/edit', component: TipoProcessoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Tipo de Processo", modal: true } },
    { path: ':id/consult', component: TipoProcessoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Tipo de Processo", modal: true } }
];
let TipoProcessoRoutingModule = class TipoProcessoRoutingModule {
};
TipoProcessoRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TipoProcessoRoutingModule);
export { TipoProcessoRoutingModule };
//# sourceMappingURL=tipo-processo-routing.module.js.map