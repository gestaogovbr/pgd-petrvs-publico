import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UteisModule } from '../uteis/uteis.module';
import { EnvioRoutingModule } from './envio-routing.module';
import { EnvioUsuarioListComponent } from './envio-usuario-list/envio-usuario-list.component';
import { EnvioPlanoTrabalhoListComponent } from './envio-plano-trabalho-list/envio-plano-trabalho-list.component';
import { EnvioPlanoEntregaListComponent } from './envio-plano-entrega-list/envio-plano-entrega-list.component';


@NgModule({
  declarations: [
    EnvioUsuarioListComponent,
    EnvioPlanoEntregaListComponent,
    EnvioPlanoTrabalhoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    EnvioRoutingModule,
    UteisModule
  ]
})
export class EnvioModule { }
