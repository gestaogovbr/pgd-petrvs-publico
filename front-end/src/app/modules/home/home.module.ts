import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGestaoComponent } from './home-gestao/home-gestao.component';
import { HomeExecucaoComponent } from './home-execucao/home-execucao.component';
import { HomeComponent } from './home.component';
import { HomeDevComponent } from './home-dev/home-dev.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { ComponentsModule } from "../../components/components.module";
import { HomeAvaliadorComponent } from './home-avaliador/home-avaliador.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [
        HomeComponent,
        HomeGestaoComponent,
        HomeExecucaoComponent,
        HomeDevComponent,
        HomeAdministradorComponent,
        HomeAvaliadorComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
