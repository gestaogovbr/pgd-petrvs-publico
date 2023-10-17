import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { CursoFormComponent } from './curso-form/curso-form.component';
import { CursoListComponent } from './curso-list/curso-list.component';

const routes: Routes = [
    { path: '', component: CursoListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
    { path: 'new', component: CursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: CursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: CursoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
 
})
export class CursoRoutingModule { }
