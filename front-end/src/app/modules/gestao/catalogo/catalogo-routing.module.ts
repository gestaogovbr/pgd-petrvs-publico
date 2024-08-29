import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CatalogoListComponent } from "./catalogo-list/catalogo-list.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ConfigResolver } from "src/app/resolvies/config.resolver";
import { CatalogoFormComponent } from "./catalogo-form/catalogo-form.component";

const routes: Routes = [
  { path: '', component: CatalogoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Catalogos" } },
  { path: 'new', component: CatalogoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de catalogo", modal: true } },
  { path: ':id/edit', component: CatalogoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de catalogo", modal: true } },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
