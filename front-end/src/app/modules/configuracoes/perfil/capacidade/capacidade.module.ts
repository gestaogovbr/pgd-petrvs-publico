import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacidadeRoutingModule } from './capacidade-routing.module';
import { CapacidadeFormComponent } from './capacidade-form/capacidade-form.component';
import { CapacidadeListComponent } from './capacidade-list/capacidade-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CapacidadeFormComponent,
    CapacidadeListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CapacidadeRoutingModule
  ]
})
export class CapacidadeModule { }
