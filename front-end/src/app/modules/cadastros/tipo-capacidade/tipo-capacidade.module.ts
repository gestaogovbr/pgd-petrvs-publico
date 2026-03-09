import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoCapacidadeRoutingModule } from './tipo-capacidade-routing.module';
import { TipoCapacidadeFormComponent } from './tipo-capacidade-form/tipo-capacidade-form.component';
import { TipoCapacidadeListComponent } from './tipo-capacidade-list/tipo-capacidade-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TipoCapacidadeFormComponent,
    TipoCapacidadeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TipoCapacidadeRoutingModule
  ]
})
export class TipoCapacidadeModule { }
