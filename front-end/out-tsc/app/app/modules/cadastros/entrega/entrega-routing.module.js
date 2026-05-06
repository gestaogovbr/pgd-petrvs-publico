import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { EntregaFormComponent } from './entrega-form/entrega-form.component';
import { EntregaListComponent } from './entrega-list/entrega-list.component';
const routes = [
    { path: '', component: EntregaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Entregas" } },
    { path: 'new', component: EntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Entrega", modal: true } },
    { path: ':id/edit', component: EntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Entrega", modal: true } },
    { path: ':id/consult', component: EntregaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Entrega", modal: true } }
];
let EntregaRoutingModule = class EntregaRoutingModule {
};
EntregaRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], EntregaRoutingModule);
export { EntregaRoutingModule };
//# sourceMappingURL=entrega-routing.module.js.map