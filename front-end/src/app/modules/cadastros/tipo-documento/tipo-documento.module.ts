import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { TipoDocumentoFormComponent } from './tipo-documento-form/tipo-documento-form.component';
import { TipoDocumentoListComponent } from './tipo-documento-list/tipo-documento-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TipoDocumentoFormComponent,
    TipoDocumentoListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TipoDocumentoRoutingModule
  ]
})
export class TipoDocumentoModule { }
