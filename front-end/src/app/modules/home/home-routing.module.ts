import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { LexicalService } from 'src/app/services/lexical.service';
import { HomeExecucaoComponent } from './home-execucao/home-execucao.component';
import { HomeAvaliadorComponent } from './home-avaliador/home-avaliador.component';
import { HomeGestaoComponent } from './home-gestao/home-gestao.component';
import { HomeDevComponent } from './home-dev/home-dev.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';

import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: 'execucao', component: HomeExecucaoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home " } },
    { path: 'avaliacao', component: HomeAvaliadorComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home " } },
    { path: 'gestao', component: HomeGestaoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home " } },
    { path: 'dev', component: HomeDevComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home " } },
    { path: 'administrador', component: HomeAdministradorComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home " } },
    { path: '', component: HomeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home " } }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
