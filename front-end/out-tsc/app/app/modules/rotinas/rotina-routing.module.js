import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { IntegracaoFormComponent } from './integracao/integracao-form/integracao-form.component';
import { IntegracaoListComponent } from './integracao/integracao-list/integracao-list.component';
const routes = [
    { path: 'integracao', component: IntegracaoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Rotinas de Integração" } },
    { path: 'integracao/new', component: IntegracaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Execução de Rotina de Integração", modal: true } },
    { path: 'integracao/:id/consult', component: IntegracaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Rotina de Integração", modal: true } }
];
let RotinaRoutingModule = class RotinaRoutingModule {
};
RotinaRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], RotinaRoutingModule);
export { RotinaRoutingModule };
//# sourceMappingURL=rotina-routing.module.js.map