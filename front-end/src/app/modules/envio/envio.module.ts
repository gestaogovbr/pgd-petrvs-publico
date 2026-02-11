import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UteisModule } from '../uteis/uteis.module';
import { EnvioReiniciarFormComponent } from './reiniciar/envio-reiniciar-form/envio-reiniciar-form.component';
import { EnvioRoutingModule } from './envio-routing.module';
import { EnvioForcarComponent } from './forcar/envio-forcar/envio-forcar.component';
import { EnvioUsuarioListComponent } from './envio-usuario-list/envio-usuario-list.component';


@NgModule({
  declarations: [
    EnvioReiniciarFormComponent,
    EnvioForcarComponent,
    EnvioUsuarioListComponent
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
