import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { RelatoLotacaoFormComponent } from './relato-lotacao-form/relato-lotacao-form.component';
const routes = [
    { path: '', component: RelatoLotacaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Relatar problema de lotação de agente público" } },
];
let RelatoLotacaoRoutingModule = class RelatoLotacaoRoutingModule {
};
RelatoLotacaoRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], RelatoLotacaoRoutingModule);
export { RelatoLotacaoRoutingModule };
//# sourceMappingURL=relato-lotacao-routing.module.js.map