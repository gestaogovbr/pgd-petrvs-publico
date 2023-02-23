import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { DocumentosComponent } from './documentos/documentos.component';

const routes: Routes = [
  { path: 'comentarios/:origem/:id/new', component: ComentariosComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Comentários", modal: true } },
  { path: 'documentos/:especie/:origem', component: DocumentosComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Documentos", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UteisRoutingModule { }
