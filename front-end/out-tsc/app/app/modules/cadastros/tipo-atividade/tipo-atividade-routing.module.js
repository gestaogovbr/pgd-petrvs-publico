import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoAtividadeFormComponent } from './tipo-atividade-form/tipo-atividade-form.component';
import { TipoAtividadeListComponent } from './tipo-atividade-list/tipo-atividade-list.component';
const routes = [
    { path: '', component: TipoAtividadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Atividades" } },
    { path: 'new', component: TipoAtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Inclusão de Atividade", modal: true } },
    { path: ':id/edit', component: TipoAtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Edição de Atividade", modal: true } },
    { path: ':id/consult', component: TipoAtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Consulta a Atividade", modal: true } }
];
let TipoAtividadeRoutingModule = class TipoAtividadeRoutingModule {
};
TipoAtividadeRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TipoAtividadeRoutingModule);
export { TipoAtividadeRoutingModule };
//# sourceMappingURL=tipo-atividade-routing.module.js.map