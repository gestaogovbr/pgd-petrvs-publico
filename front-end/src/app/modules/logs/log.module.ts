import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogRoutingModule } from './log-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeListComponent } from './change/change-list/change-list.component';
import { ChangeFormComponent } from './change/change-form/change-form.component';
import { ErrorFormComponent } from './error/error-form/error-form.component';
import { ErrorListComponent } from './error/error-list/error-list.component';
import { EnvioListComponent } from './envios/envio-list/envio-list.component';
import { MarkdownModule } from 'ngx-markdown';
import { EnvioConsultComponent } from './envios/envio-consult/envio-consult.component';
import { EnvioItemListComponent } from './envios/envio-item-list/envio-item-list.component';
import { EnvioItemParticipanteListComponent } from './envios/envio-item-participante-list/envio-item-participante-list.component';
import { EnvioItemConsultComponent } from './envios/envio-item-consult/envio-item-consult.component';

@NgModule({
  declarations: [
    ChangeListComponent,
    ChangeFormComponent,
    ErrorListComponent,
    ErrorFormComponent,
    EnvioListComponent,
    EnvioConsultComponent,
    EnvioItemListComponent,
    EnvioItemConsultComponent,
    EnvioItemParticipanteListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    LogRoutingModule,
    MarkdownModule.forRoot()
  ]
})
export class LogModule { }
