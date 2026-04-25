import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoDocumentoFormComponent } from './tipo-documento-form/tipo-documento-form.component';
import { TipoDocumentoListComponent } from './tipo-documento-list/tipo-documento-list.component';
const routes = [
    { path: '', component: TipoDocumentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Documento" } },
    { path: 'new', component: TipoDocumentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Tipo de Documento", modal: true } },
    { path: ':id/edit', component: TipoDocumentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Tipo de Documento", modal: true } },
    { path: ':id/consult', component: TipoDocumentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Tipo de Documento", modal: true } }
];
let TipoDocumentoRoutingModule = class TipoDocumentoRoutingModule {
};
TipoDocumentoRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TipoDocumentoRoutingModule);
export { TipoDocumentoRoutingModule };
//# sourceMappingURL=tipo-documento-routing.module.js.map