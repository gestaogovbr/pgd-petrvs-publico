import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoTarefaFormComponent } from './tipo-tarefa-form/tipo-tarefa-form.component';
import { TipoTarefaListComponent } from './tipo-tarefa-list/tipo-tarefa-list.component';
const routes = [
    { path: '', component: TipoTarefaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Tarefa" } },
    { path: 'new', component: TipoTarefaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Tipo de Tarefa", modal: true } },
    { path: ':id/edit', component: TipoTarefaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Tipo de Tarefa", modal: true } },
    { path: ':id/consult', component: TipoTarefaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Tipo de Tarefa", modal: true } }
];
let TipoTarefaRoutingModule = class TipoTarefaRoutingModule {
};
TipoTarefaRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TipoTarefaRoutingModule);
export { TipoTarefaRoutingModule };
//# sourceMappingURL=tipo-tarefa-routing.module.js.map