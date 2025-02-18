import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoListComponent } from "./produto-list/produto-list.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ConfigResolver } from "src/app/resolvies/config.resolver";
import { ProdutoFormComponent } from "./produto-form/produto-form.component";
import { ProdutoShowComponent } from "./produto-show/produto-show.component";
import { ProdutoFilterComponent } from "./produto-filter/produto-filter.component";

import { ChefiaGuard } from "src/app/guards/chefia.guard";

const routes: Routes = [
  { path: '', component: ProdutoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Produtos e Serviços" } },
  { path: 'new', component: ProdutoFormComponent, canActivate: [AuthGuard, ChefiaGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Produtos e Serviços - Inclusão", modal: true } },
  { path: 'filter', component: ProdutoFilterComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Produtos e Serviços - Busca Avançada", modal: true } },
  { path: ':id/edit', component: ProdutoFormComponent, canActivate: [AuthGuard, ChefiaGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Produtos e Serviços - Alteração", modal: true } },
  { path: ':id/show', component: ProdutoShowComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Produtos e Serviços - Detalhamento", modal: true } }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
