import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcorrenciaRoutingModule } from './ocorrencia-routing.module';
import { OcorrenciaFormComponent } from './ocorrencia-form/ocorrencia-form.component';
import { OcorrenciaListComponent } from './ocorrencia-list/ocorrencia-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OcorrenciaFormComponent,
    OcorrenciaListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    OcorrenciaRoutingModule
  ]
})
export class OcorrenciaModule { }
