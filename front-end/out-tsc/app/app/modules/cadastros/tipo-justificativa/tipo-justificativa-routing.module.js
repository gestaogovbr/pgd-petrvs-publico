import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoJustificativaFormComponent } from './tipo-justificativa-form/tipo-justificativa-form.component';
import { TipoJustificativaListComponent } from './tipo-justificativa-list/tipo-justificativa-list.component';
const routes = [
    { path: '', component: TipoJustificativaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Justificativa" } },
    { path: 'new', component: TipoJustificativaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Tipo de Justificativa", modal: true } },
    { path: ':id/edit', component: TipoJustificativaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Tipo de Justificativa", modal: true } },
    { path: ':id/consult', component: TipoJustificativaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Tipo de Justificativa", modal: true } }
];
let TipoJustificativaRoutingModule = class TipoJustificativaRoutingModule {
};
TipoJustificativaRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TipoJustificativaRoutingModule);
export { TipoJustificativaRoutingModule };
//# sourceMappingURL=tipo-justificativa-routing.module.js.map