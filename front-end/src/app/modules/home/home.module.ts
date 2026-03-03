import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGestaoComponent } from './home-gestao/home-gestao.component';
import { HomeExecucaoComponent } from './home-execucao/home-execucao.component';
import { HomeComponent } from './home.component';
import { HomeDevComponent } from './home-dev/home-dev.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { SharedModule } from "../../shared/shared.module";
import { HomeAvaliadorComponent } from './home-avaliador/home-avaliador.component';
import { HomeGestaoPendenciasComponent } from './home-gestao/home-gestao-pendencias.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [
        HomeComponent,
        HomeGestaoComponent,
        HomeGestaoPendenciasComponent,
        HomeExecucaoComponent,
        HomeDevComponent,
        HomeAdministradorComponent,
        HomeAvaliadorComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
