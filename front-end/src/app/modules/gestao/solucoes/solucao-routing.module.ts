import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SolucaoListComponent } from "./solucao-list/solucao-list.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ConfigResolver } from "src/app/resolvies/config.resolver";
import { SolucaoFormComponent } from "./solucao-form/solucao-form.component";
import { SolucaoFiltroComponent } from "./solucao-filtro/solucao-filtro.component";
import { SolucaoShowComponent } from "./solucao-show/solucao-show.component";


const routes: Routes = [
  { path: '', component: SolucaoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Soluções" } },
  { path: 'new', component: SolucaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Solução", modal: true } },
  { path: ':id/edit', component: SolucaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Solução", modal: true } },
  { path: 'filter', component: SolucaoFiltroComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Busca Avançada", modal: true } },
  { path: ':id/consult', component: SolucaoShowComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Solução - Detalhamento", modal: true } },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolucaoRoutingModule { }
