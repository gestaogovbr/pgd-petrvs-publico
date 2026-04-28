import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PerfilListComponent } from './perfil-list/perfil-list.component';
const routes = [
    { path: '', component: PerfilListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Perfils" } },
    { path: 'new', component: PerfilFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Perfil", modal: true } },
    { path: ':id/edit', component: PerfilFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Perfil", modal: true } },
    { path: ':perfil_id/capacidade', loadChildren: () => import('./capacidade/capacidade.module').then(m => m.CapacidadeModule), canActivate: [AuthGuard] },
    { path: ':id/consult', component: PerfilFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Perfil", modal: true } }
];
let PerfilRoutingModule = class PerfilRoutingModule {
};
PerfilRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PerfilRoutingModule);
export { PerfilRoutingModule };
//# sourceMappingURL=perfil-routing.module.js.map