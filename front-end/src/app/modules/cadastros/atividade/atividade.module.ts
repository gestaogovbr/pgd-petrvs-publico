import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtividadeRoutingModule } from './atividade-routing.module';
import { AtividadeFormComponent } from './atividade-form/atividade-form.component';
import { AtividadeListComponent } from './atividade-list/atividade-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AtividadeFormComponent,
    AtividadeListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    AtividadeRoutingModule
  ]
})
export class AtividadeModule { }
