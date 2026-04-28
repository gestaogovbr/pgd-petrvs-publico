import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoMotivoAfastamentoFormComponent } from './tipo-motivo-afastamento-form/tipo-motivo-afastamento-form.component';
import { TipoMotivoAfastamentoListComponent } from './tipo-motivo-afastamento-list/tipo-motivo-afastamento-list.component';
const routes = [
    { path: '', component: TipoMotivoAfastamentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Motivos de Afastamento" } },
    { path: 'new', component: TipoMotivoAfastamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Motivos de Afastamento", modal: true } },
    { path: ':id/edit', component: TipoMotivoAfastamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Motivos de Afastamento", modal: true } },
    { path: ':id/consult', component: TipoMotivoAfastamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Motivos de Afastamento", modal: true } }
];
let TipoMotivoAfastamentoRoutingModule = class TipoMotivoAfastamentoRoutingModule {
};
TipoMotivoAfastamentoRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TipoMotivoAfastamentoRoutingModule);
export { TipoMotivoAfastamentoRoutingModule };
//# sourceMappingURL=tipo-motivo-afastamento-routing.module.js.map