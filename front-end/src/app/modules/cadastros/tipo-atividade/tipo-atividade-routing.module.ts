import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { TipoAtividadeFormComponent } from './tipo-atividade-form/tipo-atividade-form.component';
import { TipoAtividadeListComponent } from './tipo-atividade-list/tipo-atividade-list.component';
import { LexicalService } from 'src/app/services/lexical.service';

const routes: Routes = [
  { path: '', component: TipoAtividadeListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Atividades" } },
  { path: 'new', component: TipoAtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Inclusão de Atividade", modal: true } },
  { path: ':id/edit', component: TipoAtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Edição de Atividade", modal: true } },
  { path: ':id/consult', component: TipoAtividadeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Consulta a Atividade", modal: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoAtividadeRoutingModule { }
