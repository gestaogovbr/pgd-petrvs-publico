import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PreferenciaFormUsuarioComponent } from './preferencia-form-usuario/preferencia-form-usuario.component';
import { PreferenciaFormComponent } from './preferencia-form/preferencia-form.component';
import { PreferenciaFormUnidadeComponent } from './preferencia-form-unidade/preferencia-form-unidade.component';
const routes = [
    { path: '', component: PreferenciaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Preferências" } },
    { path: 'usuario/:id', component: PreferenciaFormUsuarioComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Preferências do Usuário" } },
    { path: 'unidade/:id', component: PreferenciaFormUnidadeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Preferências da Unidade" } }
];
let PreferenciaRoutingModule = class PreferenciaRoutingModule {
};
PreferenciaRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PreferenciaRoutingModule);
export { PreferenciaRoutingModule };
//# sourceMappingURL=preferencia-routing.module.js.map