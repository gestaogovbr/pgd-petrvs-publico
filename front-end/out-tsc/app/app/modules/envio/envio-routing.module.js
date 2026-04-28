import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { EnvioReiniciarFormComponent } from './reiniciar/envio-reiniciar-form/envio-reiniciar-form.component';
import { EnvioForcarComponent } from './forcar/envio-forcar/envio-forcar.component';
const routes = [
    {
        path: 'reiniciar',
        component: EnvioReiniciarFormComponent,
        canActivate: [AuthGuard],
        resolve: { config: ConfigResolver },
        runGuardsAndResolvers: 'always',
        data: {
            title: "Reiniciar envios à API PGD"
        }
    },
    {
        path: 'forcar',
        component: EnvioForcarComponent,
        canActivate: [AuthGuard],
        resolve: { config: ConfigResolver },
        runGuardsAndResolvers: 'always',
        data: {
            title: "Forçar envio",
            modal: true
        }
    }
];
let EnvioRoutingModule = class EnvioRoutingModule {
};
EnvioRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], EnvioRoutingModule);
export { EnvioRoutingModule };
//# sourceMappingURL=envio-routing.module.js.map