import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeGestaoComponent } from './home-gestao/home-gestao.component';
import { HomeExecucaoComponent } from './home-execucao/home-execucao.component';
import { HomeProjetosComponent } from './home-projetos/home-projetos.component';
import { HomePontoComponent } from './home-ponto/home-ponto.component';
import { HomeComponent } from './home.component';
import { HomeDevComponent } from './home-dev/home-dev.component';
import { HomeRaioxComponent } from './home-raiox/home-raiox.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { ComponentsModule } from "../../components/components.module";
import { HomeAvaliadorComponent } from './home-avaliador/home-avaliador.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path:'execucao', component: HomeExecucaoComponent
      },
      {
        path:'avaliacao', component: HomeAvaliadorComponent
      },
      {
        path:'gestao', component: HomeGestaoComponent
      },
      {
        path:'projeto', component: HomeProjetosComponent
      },
      {
        path:'dev', component: HomeDevComponent
      },
      {
        path:'administrador', component: HomeAdministradorComponent
      },
      {
        path:'ponto', component: HomePontoComponent
      },
      {
        path:'raiox', component: HomeRaioxComponent
      }
    ]
  }
  
];


@NgModule({
    declarations: [
        HomeComponent,
        HomeGestaoComponent,
        HomeExecucaoComponent,
        HomeProjetosComponent,
        HomePontoComponent,
        HomeDevComponent,
        HomeRaioxComponent,
        HomeAdministradorComponent,
        HomeAvaliadorComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        CommonModule,
        ComponentsModule
    ]
})
export class HomeModule { }
