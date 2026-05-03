import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesdobramentoComponent } from './desdobramento.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { OrganizationChartModule } from 'primeng/organizationchart';
const routes = [
    { path: ':id/:type', component: DesdobramentoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Desdobramento", modal: true } }
];
let DesdobramentoModule = class DesdobramentoModule {
};
DesdobramentoModule = __decorate([
    NgModule({
        declarations: [
            DesdobramentoComponent
        ],
        imports: [
            RouterModule.forRoot(routes),
            CommonModule,
            OrganizationChartModule
        ]
    })
], DesdobramentoModule);
export { DesdobramentoModule };
//# sourceMappingURL=desdobramento.module.js.map