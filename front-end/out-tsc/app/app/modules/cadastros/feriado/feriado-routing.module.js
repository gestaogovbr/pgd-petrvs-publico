import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { FeriadoFormComponent } from './feriado-form/feriado-form.component';
import { FeriadoListComponent } from './feriado-list/feriado-list.component';
const routes = [
    { path: '', component: FeriadoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Feriados" } },
    { path: 'new', component: FeriadoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Feriado", modal: true } },
    { path: ':id/edit', component: FeriadoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Feriado", modal: true } },
    { path: ':id/consult', component: FeriadoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Feriado", modal: true } }
];
let FeriadoRoutingModule = class FeriadoRoutingModule {
};
FeriadoRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], FeriadoRoutingModule);
export { FeriadoRoutingModule };
//# sourceMappingURL=feriado-routing.module.js.map