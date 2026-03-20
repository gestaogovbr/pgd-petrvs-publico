import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacidadeRoutingModule } from './capacidade-routing.module';
import { CapacidadeFormComponent } from './capacidade-form/capacidade-form.component';
import { CapacidadeListComponent } from './capacidade-list/capacidade-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CapacidadeFormComponent,
    CapacidadeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CapacidadeRoutingModule
  ]
})
export class CapacidadeModule { }
