import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { TipoDocumentoFormComponent } from './tipo-documento-form/tipo-documento-form.component';
import { TipoDocumentoListComponent } from './tipo-documento-list/tipo-documento-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TipoDocumentoFormComponent,
    TipoDocumentoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    TipoDocumentoRoutingModule
  ]
})
export class TipoDocumentoModule { }
