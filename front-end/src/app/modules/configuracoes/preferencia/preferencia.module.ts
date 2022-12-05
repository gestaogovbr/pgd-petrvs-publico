import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferenciaRoutingModule } from './preferencia-routing.module';
import { PreferenciaFormComponent } from './preferencia-form/preferencia-form.component';
import { PreferenciaFormPetrvsComponent } from './preferencia-form-petrvs/preferencia-form-petrvs.component';
import { PreferenciaFormUsuarioComponent } from './preferencia-form-usuario/preferencia-form-usuario.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PreferenciaFormComponent,
    PreferenciaFormPetrvsComponent,
    PreferenciaFormUsuarioComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    PreferenciaRoutingModule
  ]
})
export class PreferenciaModule { }
