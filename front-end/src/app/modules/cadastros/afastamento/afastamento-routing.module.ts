import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { AfastamentoFormComponent } from './afastamento-form/afastamento-form.component';
import { AfastamentoListComponent } from './afastamento-list/afastamento-list.component';
import { LexicalService } from 'src/app/services/lexical.service';

const routes: Routes = [
  { path: '', component: AfastamentoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Afastamentos" } },
  { path: 'new', component: AfastamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "", modal: true } },
  { path: ':id/edit', component: AfastamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Afastamento", modal: true } },
  { path: ':id/consult', component: AfastamentoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Afastamento", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfastamentoRoutingModule {}
