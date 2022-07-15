import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarefaRoutingModule } from './tarefa-routing.module';
import { TarefaFormComponent } from './tarefa-form/tarefa-form.component';
import { TarefaListComponent } from './tarefa-list/tarefa-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TarefaFormComponent,
    TarefaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    TarefaRoutingModule
  ]
})
export class TarefaModule { }
