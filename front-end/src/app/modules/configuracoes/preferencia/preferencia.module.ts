import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenciaRoutingModule } from './preferencia-routing.module';
import { PreferenciaFormComponent } from './preferencia-form/preferencia-form.component';
import { PreferenciaFormPetrvsComponent } from './preferencia-form-petrvs/preferencia-form-petrvs.component';
import { PreferenciaFormUsuarioComponent } from './preferencia-form-usuario/preferencia-form-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UteisModule } from '../../uteis/uteis.module';
import { PreferenciaFormUnidadeComponent } from './preferencia-form-unidade/preferencia-form-unidade.component';


@NgModule({
  declarations: [
    PreferenciaFormComponent,
    PreferenciaFormPetrvsComponent,
    PreferenciaFormUsuarioComponent,
    PreferenciaFormUnidadeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PreferenciaRoutingModule,
    UteisModule
  ]
})
export class PreferenciaModule { }
