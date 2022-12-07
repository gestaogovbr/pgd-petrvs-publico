import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeriadoRoutingModule } from './feriado-routing.module';
import { FeriadoFormComponent } from './feriado-form/feriado-form.component';
import { FeriadoListComponent } from './feriado-list/feriado-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FeriadoFormComponent,
    FeriadoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FeriadoRoutingModule
  ]
})
export class FeriadoModule { }
