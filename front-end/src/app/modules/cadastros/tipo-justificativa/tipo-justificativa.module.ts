import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoJustificativaRoutingModule } from './tipo-justificativa-routing.module';
import { TipoJustificativaFormComponent } from './tipo-justificativa-form/tipo-justificativa-form.component';
import { TipoJustificativaListComponent } from './tipo-justificativa-list/tipo-justificativa-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TipoJustificativaFormComponent,
    TipoJustificativaListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TipoJustificativaRoutingModule
  ]
})
export class TipoJustificativaModule { }
