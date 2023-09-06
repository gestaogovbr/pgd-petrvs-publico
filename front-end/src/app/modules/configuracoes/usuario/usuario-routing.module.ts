import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioIntegranteComponent } from './usuario-integrante/usuario-integrante.component';

const routes: Routes = [
  { path: '', component: UsuarioListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Usuários" } },
  { path: 'new', component: UsuarioFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Usuário", modal: true } },
  { path: ':id/edit', component: UsuarioFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição de Usuário", modal: true } },
  //{ path: ':usuario_id/lotacao', loadChildren: () => import('./lotacao/lotacao.module').then(m => m.LotacaoModule), canActivate: [AuthGuard] },
  { path: ':id/consult', component: UsuarioFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Usuário", modal: true } },
  { path: ':id/integrante', component: UsuarioIntegranteComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Unidades Integrantes", modal: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
