import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramaRoutingModule } from './programa-routing.module';
import { ProgramaFormComponent } from './programa-form/programa-form.component';
import { ProgramaListComponent } from './programa-list/programa-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramaParticipantesComponent } from './programa-participantes/programa-participantes.component';
import { PedagioFormComponent } from './pedagio-form/pedagio-form.component';


@NgModule({
  declarations: [
    ProgramaFormComponent,
    ProgramaListComponent,
    ProgramaParticipantesComponent,
    PedagioFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProgramaRoutingModule
  ]
})
export class ProgramaModule { }
