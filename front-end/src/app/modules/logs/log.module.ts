import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogRoutingModule } from './log-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeListComponent } from './change/change-list/change-list.component';
import { ErrorFormComponent } from './error/error-form/error-form.component';
import { ErrorListComponent } from './error/error-list/error-list.component';
import { EnvioListComponent } from './envios/envio-list/envio-list.component';
import { EnvioConsultComponent } from './envios/envio-consult/envio-consult.component';
import { EnvioItemParticipanteListComponent } from './envios/envio-item-participante-list/envio-item-participante-list.component';
import { EnvioItemConsultComponent } from './envios/envio-item-consult/envio-item-consult.component';
import { EnvioItemTrabalhoListComponent } from './envios/envio-item-trabalho-list/envio-item-trabalho-list.component';
import { EnvioItemEntregaListComponent } from './envios/envio-item-entrega-list/envio-item-entrega-list.component';

@NgModule({
  declarations: [
    ChangeListComponent,
    ErrorListComponent,
    ErrorFormComponent,
    EnvioListComponent,
    EnvioConsultComponent,
    EnvioItemConsultComponent,
    EnvioItemParticipanteListComponent,
    EnvioItemTrabalhoListComponent,
    EnvioItemEntregaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    LogRoutingModule,
  ]
})
export class LogModule { }
