import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramaRoutingModule } from './programa-routing.module';
import { ProgramaFormComponent } from './programa-form/programa-form.component';
import { ProgramaListComponent } from './programa-list/programa-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramaParticipantesComponent } from './programa-participantes/programa-participantes.component';


@NgModule({
  declarations: [
    ProgramaFormComponent,
    ProgramaListComponent,
    ProgramaParticipantesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    ProgramaRoutingModule
  ]
})
export class ProgramaModule { }
