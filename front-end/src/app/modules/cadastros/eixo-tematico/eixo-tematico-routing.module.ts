import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { EixoTematicoFormComponent } from './eixo-tematico-form/eixo-tematico-form.component';
import { EixoTematicoListComponent } from './eixo-tematico-list/eixo-tematico-list.component';

const routes: Routes = [
  { path: '', component: EixoTematicoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Eixos Temáticos" } },
  { path: 'new', component: EixoTematicoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Incluir Eixo Temático", modal: true } },
  { path: ':id/edit', component: EixoTematicoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Editar Eixo Temático", modal: true } },
  { path: ':id/consult', component: EixoTematicoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar Eixo Temático", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EixoTematicoRoutingModule { }
